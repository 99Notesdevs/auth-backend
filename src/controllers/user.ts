import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import logger from "../utils/logger";
import { OAuth2Client } from "google-auth-library";
import {
  userDetailsValidation,
  userLoginValidation,
  userUpdateValidation,
} from "../validations/user.validation";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const domain = process.env.DOMAIN || ".main.local";
const production = process.env.ENV === "production";

export class User {
  static async check(req: Request, res: Response) {
    try {
      logger.info("Checking user authentication");
      res.status(200).json({ success: true, message: "User is authenticated" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in check method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in check user method");
        res
          .status(400)
          .json({ success: false, message: "Something went wrong in check" });
      }
    }
  }

  static async googleOneTapLogin(req: Request, res: Response) {
    try {
      const { credential } = req.body;
      if (!credential) throw new Error("No credential provided");

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      logger.info("Google One Tap token verified successfully");

      const payload = ticket.getPayload();
      const email = payload?.email;
      const name = payload?.name;
      const sub = payload?.sub;

      if (!email) throw new Error("Invalid token");

      const data = {
        email,
        name: name || "",
        oauthId: sub || "",
        oauthProvider: "google",
      };

      const token = await UserService.googlAuthLogin(data);
      logger.info("User logged in successfully via Google One Tap");

      res.cookie("token", token, {
        domain: `${domain}`, // critical: enables subdomain sharing
        httpOnly: production,
        secure: production, // for HTTP in local dev
        sameSite: "lax",
      });
      res.status(200).json({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in googleOneTapLogin method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in googleOneTapLogin method");
        res
          .status(500)
          .json({
            success: false,
            message: "Something went wrong in googleOneTapLogin",
          });
      }
    }
  }

  static async userDetails(req: Request, res: Response) {
    try {
      logger.info("Fetching user details");
      const id = req.authUser;
      const user = await UserService.getUserDetails(Number(id));
      if (!user) throw new Error("User not found");
      logger.info("User details fetched successfully");
      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in userDetails method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in userDetails method");
        res
          .status(400)
          .json({
            success: false,
            message: "Something went wrong in userDetails",
          });
      }
    }
  }

  static async adminUserDetails(req: Request, res: Response) {
    try {
      logger.info("Fetching user details");
      const id = req.params.id;
      logger.info("Token verified successfully");
      const user = await UserService.getUserDetails(Number(id));
      if (!user) throw new Error("User not found");
      logger.info("User details fetched successfully");
      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in userDetails method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in userDetails method");
        res
          .status(400)
          .json({
            success: false,
            message: "Something went wrong in userDetails",
          });
      }
    }
  }

  static async register(req: Request, res: Response) {
    try {
      logger.info("Registering a new user");
      const body = req.body;
      if (!body.firstName || !body.lastName || !body.email || !body.password)
        throw new Error("Invalid body on register");
      const data = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
      };
      const success = userDetailsValidation.safeParse(data);
      if (!success.success) throw new Error("Parsing failed");
      const user = await UserService.registerUser(data);
      if (!user) throw new Error("User cannot be registered");
      logger.info("User registered successfully");
      res.cookie("token", user, {
        domain: `${domain}`, // critical: enables subdomain sharing
        httpOnly: production,
        secure: production, // for HTTP in local dev
        sameSite: "lax",
      });
      res.status(200).json({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Error in register user method ${error.message}`);
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in register method");
        res
          .status(400)
          .json({
            success: false,
            message: "Something went wrong in register",
          });
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      logger.info("Logging in user");
      const body = req.body;
      if (!body.email || !body.password)
        throw new Error("Invalid body on login");
      const data = {
        email: body.email,
        password: body.password,
      };
      const { success } = userLoginValidation.safeParse(data);
      if (!success) throw new Error("Invalid email or password to login");
      const user = await UserService.loginUser(data);
      if (!user) throw new Error("User cannot be logged in");
      logger.info("User logged in successfully");
      res.cookie("token", user, {
        domain: domain, // critical: enables subdomain sharing
        httpOnly: production,
        secure: production, // for HTTP in local dev
        sameSite: "lax",
      });
      res.status(200).json({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Error in login user method ${error.message}`);
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in login method");
        res
          .status(400)
          .json({ success: false, message: "Something went wrong in login" });
      }
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      logger.info("Logging out user");
      const body = req.body;
      const data = {
        token: req.authUser || "",
      };
      const user = await UserService.logoutUser(data);
      if (!user) throw new Error("Cannot logout");
      logger.info("User logged out successfully");
      res.clearCookie("token", {
        domain: domain, // critical: enables subdomain sharing
        httpOnly: production,
        secure: production, // for HTTP in local dev
        sameSite: "lax",
      });
      res.status(200).json({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in logout user method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in logout method");
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" });
      }
    }
  }

  static async userUpdate(req: Request, res: Response) {
    try {
      logger.info("Updating user details");
      const body = req.body;
      if (!body.password || !req.authUser)
        throw new Error("Invalid body on userUpdate");
      const data = {
        id: parseInt(req.authUser),
        password: body.password,
      };
      logger.info("User update data prepared");
      const { success } = userUpdateValidation.safeParse(data);
      if (!success) throw new Error("Invalid password to update");
      const user = await UserService.updateUser(data);
      if (!user) throw new Error("User cannot be updated");
      logger.info("User updated successfully");
      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in userUpdate method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in userUpdate method");
        res
          .status(400)
          .json({
            success: false,
            message: "Something went wrong in userUpdate",
          });
      }
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      logger.info("Deleting user");
      const body = req.body;
      if (!req.authUser) throw new Error("Invalid body on deleteUser");
      const data = {
        id: parseInt(req.authUser),
      };
      logger.info("User delete data prepared");
      const user = await UserService.deleteUser(data);
      if (!user) throw new Error("User cannot be deleted");
      logger.info("User deleted successfully");
      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in deleteUser method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in deleteUser method");
        res
          .status(400)
          .json({
            success: false,
            message: "Something went wrong in deleteUser",
          });
      }
    }
  }

  static async validate(req: Request, res: Response) {
    logger.info("Validating user token");
    try {
      const id = req.authUser;
      if (!id) throw new Error("Token not found");
      logger.info("Token verified successfully");
      const user = await UserService.validateUser(Number(id));
      if (!user) throw new Error("Validation not found");
      logger.info("User validated successfully");
      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in validate method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in validate user method");
        res
          .status(500)
          .json({
            success: false,
            message: "Something went wrong in validate",
          });
      }
    }
  }

  static async updateUserData(req: Request, res: Response) {
    logger.info("Updating user data");
    try {
      const body = req.body;
      const id = req.authUser;
      if (!id) throw new Error("Token not found");
      const data: {
        paidUser?: boolean;
        validTill?: Date;
        tagsCovered?: string[];
      } = {};
      if (body.paidUser)
        data.paidUser = body.paidUser === "true" || body.paidUser === true;
      if (body.validTill) data.validTill = new Date(body.validTill);
      if (body.tagsCovered) data.tagsCovered = body.tagsCovered;
      logger.info("User update data prepared");
      const updatedUser = await UserService.updateUserData({
        id: Number(id),
        data,
      });
      if (!updatedUser) throw new Error("User data cannot be updated");
      logger.info("User data updated successfully");
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in updateUserData method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in updateUserData method");
        res
          .status(500)
          .json({
            success: false,
            message: "Something went wrong in updateUserData",
          });
      }
    }
  }

  static async adminUpdateUser(req: Request, res: Response) {
    logger.info("Updating user data");
    try {
      const body = req.body;
      const id = req.params.id;
      if (!id) throw new Error("Token not found");
      const data: {
        paidUser?: boolean;
        validTill?: Date;
        tagsCovered?: string[];
      } = {};
      if (body.paidUser)
        data.paidUser = body.paidUser === "true" || body.paidUser === true;
      if (body.validTill) data.validTill = new Date(body.validTill);
      if (body.tagsCovered) data.tagsCovered = body.tagsCovered;
      logger.info("User update data prepared");
      const updatedUser = await UserService.updateUserData({
        id: Number(id),
        data,
      });
      if (!updatedUser) throw new Error("User data cannot be updated");
      logger.info("User data updated successfully");
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in updateUserData method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in updateUserData method");
        res
          .status(500)
          .json({
            success: false,
            message: "Something went wrong in updateUserData",
          });
      }
    }
  }
}

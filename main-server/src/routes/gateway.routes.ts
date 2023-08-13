import { Request, Response, Router, response } from "express";
import { ServiceRegistryService } from "../services/serviceRegistry.service";
import axios from "axios";
import { container } from "tsyringe";
import HttpException from "../utils/HttpException";
import { Status } from "../constants/enum";
import { StatusCodes } from "../constants/statusCodes";
import { catchAsync } from "../utils/catchAsync";
import { isArray } from "class-validator";
import fs from "fs";
import FormData from "form-data";
const router = Router();
const client = async () => {
  return await container.resolve(ServiceRegistryService).gets();
};

router.all("/:serviceName/:target", async (req: Request, res: Response) => {
  const clientDetail = await client();
  console.log("first", clientDetail);
  console.log("second", clientDetail.length);
  if (clientDetail.length <= 0) {
    // throw HttpException.noContent("ppp")
    res.status(StatusCodes.NO_CONTENT).send({
      success: false,
      code: StatusCodes.NO_CONTENT,
      message: "No one Client Exist",
    });
  }
  clientDetail.map((endPoint) => {
    let response;
    if (endPoint.serviceName === req.params.serviceName) {
      if (endPoint.status === Status.DIE) {
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
          success: false,
          code: StatusCodes.SERVICE_UNAVAILABLE,
          message:
            "Requested Service are  not available for some time Please try later",
        });
      }
      let url;
      if (req.query.action) {
        url = `http://${endPoint.host}:${endPoint.port}/api/${endPoint.serviceName}/${req.params.target}/${req.query.action}`;
      } else {
        url = `http://${endPoint.host}:${endPoint.port}/api/${endPoint.serviceName}/${req.params.target}`;
      }
      switch (req.method.toString()) {
        case "POST":
          if (req.params.target === "media") {
            console.log(req.files, "pppppp");

            const form = new FormData(); // Create a new FormData instance

            // Append the media file to the FormData object
            //@ts-ignore
            // form.append("media", req.files, {
            //   filename: req.file.originalname,
            //   contentType: req.file.mimetype,
            // });

            form.append("media", req.files);

            // ... (other code)

            axios
              .post(url,{
                // withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data", // Set the content type for form data
                  Authorization: req.headers.authorization,
                },
            
              })
              .then((response) => {
                res.send(response.data);
              })
              .catch((error) => {
                return res.status(error.response.status).json({
                  success: error.response.data.success,
                  code: error.response.data.code,
                  message: error.response.data.message,
                });
              });
          } else {
            axios
              .post(url, req.body, { withCredentials: true })
              .then((response) => {
                res.send(response.data);
              })
              .catch((error) => {
                return res.status(error.response.status).json({
                  success: error.response.data.success,
                  code: error.response.data.code,
                  message: error.response.data.message,
                });
              });
          }

          break;
        case "GET":
          axios
            .get(url, {
              withCredentials: true,
              data: req.body,
              headers: { Authorization: req.headers.authorization },
            })
            .then((response) => {
              res.send(response.data);
            })
            .catch((error) => {
              return res.status(error.response.status).json({
                success: error.response.data.success,
                code: error.response.data.code,
                message: error.response.data.message,
              });
            });
          break;
        case "PATCH":
          axios
            .patch(url, {
              withCredentials: true,
              data: req.body,
              headers: { Authorization: req.headers.authorization },
            })
            .then((response) => {
              res.send(response.data);
            })
            .catch((error) => {
              return res.status(error.response.status).json({
                success: error.response.data.success,
                code: error.response.data.code,
                message: error.response.data.message,
              });
            });
          break;
        case "DELETE":
          axios
            .delete(url, {
              withCredentials: true,
              data: req.body,
              headers: { Authorization: req.headers.authorization },
            })
            .then((response) => {
              console.log(response.data, "kkkk");
              res.send(response.data);
            })
            .catch((error) => {
              return res.status(error.response.status).json({
                success: error.response.data.success,
                code: error.response.data.code,
                message: error.response.data.message,
              });
            });
          break;
        default:
          return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            success: false,
            code: StatusCodes.METHOD_NOT_ALLOWED,
            message: "Method Not Found",
          });
      }
    } else {
      return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        success: false,
        code: StatusCodes.METHOD_NOT_ALLOWED,
        message: "Service Not Found",
      });
    }
  });
});

export default router;

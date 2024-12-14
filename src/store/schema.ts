import Ajv, { JSONSchemaType } from "ajv";
import { EditorType } from "../types/types";

export default function checkFileIsPresentation(presentation: any) {
  const ajv = new Ajv();

  const schema: JSONSchemaType<EditorType> = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "presentation": {
        "type": "object",
        "properties": {
          "id": { "type": "number" },
          "title": { "type": "string" },
          "slides": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": { "type": "number" },
                "background": {
                  "type": "object",
                  "properties": {
                    "type": { "type": "string", "enum": ["image", "solid", "gradient"] },
                    "src": { "type": ["string", "null"] },
                    "color": { "type": "string" },
                    "gradient": {
                      "type": "object",
                      "properties": {
                        "type": { "type": "string", "enum": ["linear", "radial"] },
                        "color": {
                          "type": "array",
                          "items": { "type": "string" }
                        },
                        "position": { "type": "number" }
                      },
                      "required": ["type", "color"]
                    }
                  },
                  "required": ["type"]
                },
                "info": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "oneOf": [
                      {
                        "type": "object",
                        "properties": {
                          "id": { "type": "number" },
                          "type": { "type": "string", "enum": ["text"] },
                          "position": {
                            "type": "object",
                            "properties": {
                              "x": { "type": "number" },
                              "y": { "type": "number" }
                            },
                            "required": ["x", "y"]
                          },
                          "size": {
                            "type": "object",
                            "properties": {
                              "width": { "type": "number" },
                              "height": { "type": "number" }
                            },
                            "required": ["width", "height"]
                          },
                          "text": { "type": "string" },
                          "font": { "type": "string" },
                          "color": { "type": "string" }
                        },
                        "required": ["id", "type", "position", "size", "text", "font", "color"]
                      },
                      {
                        "type": "object",
                        "properties": {
                          "id": { "type": "number" },
                          "type": { "type": "string", "enum": ["image"] },
                          "position": {
                            "type": "object",
                            "properties": {
                              "x": { "type": "number" },
                              "y": { "type": "number" }
                            },
                            "required": ["x", "y"]
                          },
                          "size": {
                            "type": "object",
                            "properties": {
                              "width": { "type": "number" },
                              "height": { "type": "number" }
                            },
                            "required": ["width", "height"]
                          },
                          "src": { "type": "string" }
                        },
                        "required": ["id", "type", "position", "size", "src"]
                      }
                    ]
                  }
                }
              },
              "required": ["id", "background"]
            }
          }
        },
        "required": ["id", "title", "slides"]
      },
      "selection": {
        "type": "object",
        "properties": {
          "selectedSlideId": { "type": ["number", "null"] }
        },
        "required": ["selectedSlideId"]
      }
    },
    "required": ["presentation", "selection"]
  }

  const validate = ajv.compile<EditorType>(schema);

  if(validate(presentation)) return true;
  return false;
}
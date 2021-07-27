import { JSONSchemaType } from "ajv";

type findQuery = {
  city: string;
  date?: {
    start: string;
    end: string;
  };
  flexible?: {
    type: "weekend"|"week"|"month" ;
    months: string[];
  };
  apartmentType?: string;
  amenities?: string[];
};

export const findQuerySchema: JSONSchemaType<findQuery> = {
  $id: "/productFindQuery",
  type: "object",
  required: ["city"],
  properties: {
    city: {
      type: "string",
    },
    date: {
      type: "object",
      nullable: true,
      required: ["start", "end"],
      properties: {
        start: {
          type: "string",
        },
        end: {
          type: "string",
        },
      },
    },
    amenities: {
      type: "array",
      nullable: true,
      items: {
        type: "string",
      },
    },
    apartmentType: {
      type: "string",
      nullable: true,
    },
    flexible: {
      type: "object",
      nullable: true,
      required: ["type", "months"],
      properties: {
        type: {
          type: "string",
          enum:["month","week","weekend"]
        },
        months: {
          type: "array",
          items:{
            type:"string"
          }
        },
      },
    },
  },
  additionalProperties: false,
};

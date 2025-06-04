import { StaticImageData } from "next/image";

export type Program = {
    id:number;
  title:string;
  description: string;
  link:string;
  image:string |StaticImageData
};

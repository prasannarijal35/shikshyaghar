import { StaticImageData } from "next/image";

export type Training = {
  title:string;
  description: string;
  link:string;
  imgae:string| StaticImageData
};

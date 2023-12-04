// all images imported from images directory
import product_01_image_01 from "../images/product_01.jpg";
import product_01_image_02 from "../images/product_01.1.jpg";
import product_01_image_03 from "../images/product_01.3.jpg";

import product_02_image_01 from "../images/product_2.1.jpg";
import product_02_image_02 from "../images/product_2.2.jpg";
import product_02_image_03 from "../images/product_2.3.jpg";

import product_03_image_01 from "../images/product_3.1.jpg";
import product_03_image_02 from "../images/product_3.2.jpg";
import product_03_image_03 from "../images/product_3.3.jpg";

import product_04_image_01 from "../images/product_4.1.jpg";
import product_04_image_02 from "../images/product_4.2.jpg";
import product_04_image_03 from "../images/product_4.3.png";

import product_05_image_01 from "../images/product_04.jpg";
import product_05_image_02 from "../images/product_08.jpg";
import product_05_image_03 from "../images/product_09.jpg";

import product_06_image_01 from "../images/bread(1).png";
import product_06_image_02 from "../images/bread(2).png";
import product_06_image_03 from "../images/bread(3).png";



import product_07 from "./../images/ACIDITY-TEST-KIT.jpg"
import product_09 from "./../images/ALKALINITY-IN-WATER-TEST-KIT.jpg"
import product_10 from "./../images/ALKALINITY-TEST-KIT.jpg"
import product_11 from "./../images/ALKALINITY-TEST-KIT---TITRATOR.jpg"
import product_12 from "./../images/ALUMINUM-TEST-KIT.jpg"
import product_13 from "./../images/AMMONIA-NITROGEN-TEST-KIT.jpg"
import product_14 from "./../images/Aquaponics-and-Hydroponics-Kits.jpg"
import product15 from "./../images/AT-Visual-Series-Water-Softener-Demo-Kit.jpg"
import product_16 from "./../images/CHLORINE-IN-DRINKING-WATER-TEST-KIT.jpg"
import product_17 from "./../images/DPD-FREE,-TOTAL-&-COMBINED-CHLORINE-TEST-KIT.jpg"
import product_18 from "./../images/Electronic-Aquaculture-Lab.jpg"
import product_19 from "./../images/FAS-DPD-CHLORINE-TEST-KIT.jpg"
import product_20 from "./../images/Fresh-Water-Combination-Kits.jpg"
import product_21 from "./../images/Fresh-Water-Combination-Kits2.jpg"
import product_22 from "./../images/HIGH-RANGE-CHLORINE-TEST-KIT.jpg"
import product_23 from "./../images/Individual-Test-KitsINSTA-TEST-3-PLUS.jpg"
import product_24 from "./../images/INSTA-TEST-4-PLUS.jpg"
import product_25 from "./../images/INSTA-TEST-POOL-4-PLUS.jpg"
import Instrumentation from "./../images/Instrumentation.jpg"
import product_26 from "./../images/LOW-RANGE-COPPER-TEST-KIT.jpg"
import product_27 from "./../images/LOW-RANGE-MANGANESE-TEST-KIT.jpg"
import product_28 from "./../images/Sampling-Equipment.jpg"
import product_29 from "./../images/WaterLink-Spin-Touch-DW-Sales-Demonstration-Outfit.jpg"


export interface Iproduct {
  _id: string | number
  title: string
  price: number
  image01: string
  image02: string
  image03: string
  category: string
  desc: string,
}

const allproducts: Iproduct[] = []

const products: Iproduct[] = [];

export default products;

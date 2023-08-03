import express from "express";
import {
  SearchHospital,
  SearchMedicine,
  SearchPharmacy,
  SearchDoctor,
  SearchNurse,
} from "../controllers/search.js";

const router = express.Router();

router.get("/hospital", SearchHospital);

router.get("/medicine", SearchMedicine);
router.get("/pharmacy", SearchPharmacy);
router.get("/doctor", SearchDoctor);
router.get("/nurse", SearchNurse);
export default router;

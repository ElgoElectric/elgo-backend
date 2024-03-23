-- DropForeignKey
ALTER TABLE "Anomaly" DROP CONSTRAINT "Anomaly_device_label_fkey";

-- DropForeignKey
ALTER TABLE "Datastream" DROP CONSTRAINT "Datastream_device_label_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SagemakerAnomaly" DROP CONSTRAINT "SagemakerAnomaly_device_label_fkey";

-- CreateTable
CREATE TABLE "Anomaly" (
    "id" SERIAL NOT NULL,
    "device_label" VARCHAR(256) NOT NULL,
    "timestamp_start" TIMESTAMP(0) NOT NULL,
    "timestamp_end" TIMESTAMP(0),
    "valid_anomaly" BOOLEAN NOT NULL,
    "action_taken" BOOLEAN NOT NULL,

    CONSTRAINT "Anomaly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Datastream" (
    "id" SERIAL NOT NULL,
    "device_label" VARCHAR(256) NOT NULL,
    "power" DECIMAL(65,30) NOT NULL,
    "timestamp" TIMESTAMP(0) NOT NULL,
    "on_off" BOOLEAN NOT NULL,

    CONSTRAINT "Datastream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "device_label" VARCHAR(256) NOT NULL,
    "user_id" VARCHAR(256) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SagemakerAnomaly" (
    "id" SERIAL NOT NULL,
    "device_label" VARCHAR(256) NOT NULL,
    "power" DECIMAL(65,30) NOT NULL,
    "timestamp" TIMESTAMP(0) NOT NULL,
    "isofAnomaly" BOOLEAN NOT NULL,
    "lstmAnomaly" BOOLEAN NOT NULL,

    CONSTRAINT "SagemakerAnomaly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_device_label_key" ON "Device"("device_label");

-- AddForeignKey
ALTER TABLE "Anomaly" ADD CONSTRAINT "Anomaly_device_label_fkey" FOREIGN KEY ("device_label") REFERENCES "Device"("device_label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Datastream" ADD CONSTRAINT "Datastream_device_label_fkey" FOREIGN KEY ("device_label") REFERENCES "Device"("device_label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SagemakerAnomaly" ADD CONSTRAINT "SagemakerAnomaly_device_label_fkey" FOREIGN KEY ("device_label") REFERENCES "Device"("device_label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anomaly" ADD CONSTRAINT "Anomaly_device_label_fkey" FOREIGN KEY ("device_label") REFERENCES "Device"("device_label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Datastream" ADD CONSTRAINT "Datastream_device_label_fkey" FOREIGN KEY ("device_label") REFERENCES "Device"("device_label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SagemakerAnomaly" ADD CONSTRAINT "SagemakerAnomaly_device_label_fkey" FOREIGN KEY ("device_label") REFERENCES "Device"("device_label") ON DELETE RESTRICT ON UPDATE CASCADE;

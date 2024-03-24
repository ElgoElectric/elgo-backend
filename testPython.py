import requests


def main():
    # Endpoint URL
    url = 'https://elgo-backend.vercel.app/anomalies/createAnomaly'

    # JSON body data
    data = {
        "device_label": "device12345",
        "timestamp_start": "2023-04-30T15:00:00.000Z",
        "timestamp_end": "2023-04-30T19:00:00.000Z",
        "valid_anomaly": True,
        "action_taken": False
    }

    # Sending the POST request
    response = requests.post(url, json=data)

    # Check if the request was successful
    if response.status_code == 200:
        print('Success!')
        # If the response contains JSON data, you can parse it like this:
        try:
            print(response.json())
        except ValueError:
            print("Response isn't JSON format.")
    else:
        print('Failed to send the data.')
        print(f'Status code: {response.status_code}')
        print(f'Response: {response.text}')


if __name__ == "__main__":
    main()

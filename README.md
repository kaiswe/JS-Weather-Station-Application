# Weather-Application
A web client and server used to aynchronously display specific weather measurements in various formats

A robust application that enforces a strong foundation of modularity, the correct use of external JS libraries to display and/or process external XML
and JSON data, while ensuring that the separation between client and server processing functions remains at its core. Outlined below are the functionality and technical
requirements integrated within the solution:

The client program provides a web page that allows the user to access information regarding weather measurements.

The user can select wind speed, solar radiation, or both as the weather measurements, select between a nominated time frame (months) of a specific year (2007 – 2016). 

The client successfully displays results in a tabular format (columns for all months of the nominated year and rows for sensor readings) and a line graph (x-axis for the specific months set by the user of the nominated year, and the y-axis for the sensor readings).

The client program is designed as a Single Page Application.

The client program uses asynchronous requests to retrieve data and resources from the server and can effectively present said retrieved data to the client in the required formats (Integration of Ajax and JQuery).

The server provides the correct processing functionality to serve the client’s requests and retrieve data files during runtime. The server extracts the requested information through the implementation of various JSON and XML technologies that processes and returns the data to the client.

The application can interface with the identified website in order to obtain, and process the necessary JSON or XML data.

The extraction and processing of data within the correct data structures for the user nominated time frame and sensors.
The calculation of the average wind speed per month and/or the total solar radiation per month for the time frame nominated by the user, and returning said averaged or totaled data to the client.

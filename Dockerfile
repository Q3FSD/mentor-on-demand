# Start with a base image containing Apache httpd
FROM httpd:2-alpine

# Set Env
ENV TZ Asia/Shanghai

# Copy angular dist folder to container 
COPY dist/mentor-on-demand/ /usr/local/apache2/htdocs/

# Copy httpd.conf to container
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Change permissions
RUN chmod -R 755 /usr/local/apache2/htdocs/

# Expose port
EXPOSE 4200
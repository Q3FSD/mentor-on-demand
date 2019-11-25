# Start with a base image containing Apache httpd
FROM httpd:2-alpine

# Set Env
ENV TZ Asia/Shanghai

# Copy angular dist folder to container 
COPY dist/ /usr/local/apache2/htdocs/

# Change permissions
RUN chmod -R 755 /usr/local/apache2/htdocs/

# Expose port
EXPOSE 4200
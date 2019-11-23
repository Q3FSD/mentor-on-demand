# Start with a base image containing Java runtime
FROM httpd:2-alpine

# Set Env
ENV TZ Asia/Shanghai

# The application's static files
RUN ng build --prod

# Copy angular dist folder to the container 
COPY dist/ /usr/local/apache2/htdocs/

# Copy htaccess and httpd.conf to the container
COPY .htaccess /usr/local/apache2/htdocs/
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Change permissions
RUN chmod -R 755 /usr/local/apache2/htdocs/

# Expose port
EXPOSE 4200
# Start with a base image containing Apache httpd
FROM httpd:2-alpine

# Set Env
ENV TZ Asia/Shanghai

# Copy angular project folder to the container
COPY ./ /usr/mentor-on-demand
WORKDIR /usr/mentor-on-demand

# Build and copy angular dist folder in the container
RUN apk add --update nodejs-npm && npm install -g @angular/cli && ng build --prod && mv dist/ /usr/local/apache2/htdocs/

# Copy htaccess and httpd.conf to the container
COPY .htaccess /usr/local/apache2/htdocs/
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Change permissions
RUN chmod -R 755 /usr/local/apache2/htdocs/

# Expose port
EXPOSE 4200
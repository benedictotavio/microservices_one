FROM gradle:jdk17
COPY --chown=gradle:gradle . .
WORKDIR .
RUN gradle build -x test --no-daemon
EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "build/libs/product-api-0.0.1-SNAPSHOT.jar"]
CMD [ "gradle","bootRun" ]
package com.beppe;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


@SpringBootApplication
public class ApplicationConfig extends WebMvcConfigurerAdapter implements CommandLineRunner {



    public static void main(String[] args) throws Exception {
        SpringApplication.run(ApplicationConfig.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        System.out.println("服务了");
    }
}

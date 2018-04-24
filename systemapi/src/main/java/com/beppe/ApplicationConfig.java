package com.beppe;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


@SpringBootApplication
@PropertySource("classpath:dubbo.properties")
//@MapperScan(basePackages = "com.beppe.dao")
//@EnableTransactionManagement
@ImportResource("classpath:customer.xml")
public class ApplicationConfig extends WebMvcConfigurerAdapter implements CommandLineRunner, EmbeddedServletContainerCustomizer {


    public static void main(String[] args) throws Exception {
        ConfigurableApplicationContext run = SpringApplication.run(ApplicationConfig.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        System.out.println("服务了开启");
    }

    @Override
    public void customize(ConfigurableEmbeddedServletContainer configurableEmbeddedServletContainer) {
        configurableEmbeddedServletContainer.setPort(8088);
    }

}

package com.beppe.api;

import com.beppe.service.impl.CityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SampleController {

    @Value("${name}")
    private  String name;
    @Autowired
    private CityServiceImpl cityService;
    @RequestMapping("/")
    public String home() {
        cityService.getCities();
        System.out.println("properties value is "+name);
        return "hello world";
    }

}

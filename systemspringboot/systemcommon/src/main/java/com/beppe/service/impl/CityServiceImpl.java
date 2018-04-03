package com.beppe.service.impl;

import com.beppe.dao.CityMapper;
import com.beppe.entity.City;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("cityService")
public class CityServiceImpl {

    @Resource
    private CityMapper  cityMapper;
    public  void getCities(){
        City city= cityMapper.selectByPrimaryKey(1);

        System.out.println(city.getName()+city.getPopulation());

        System.out.println("this is the teest!!");

        System.out.println("this is the branch test!!");

        System.out.println("this is the local branch!!");
    }

}

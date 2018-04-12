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

        System.out.println("this is the git test") ;

        System.out.println("this is the test");

        System.out.println("进行修复第一个大bug!!");

        System.out.println("第一个大bug正在修复中!!");

        System.out.println("第一个大的bug已经修复了！需要开始提交了");

        System.out.println("正在处理第2个bug");

        System.out.println("第二个bug处理结束了");
    }

}

package com.dubbo.serviceImpl;

import com.dubbo.dao.CustomerMapper;
import com.dubbo.iservice.DubboService;
import com.dubbo.model.Customer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by zhangshangliang on 2018/1/3.
 */

@Service("dubboService")
public class DubboServiceImpl implements DubboService{

    @Resource
    private CustomerMapper cusstomerMapper;


    @Override
    public Customer selectCustomer(String id) {
        com.dubbo.entity.Customer customer = cusstomerMapper.selectByPrimaryKey(id);
        Customer c=new Customer();
        c.setId(customer.getId());
        c.setCoin(customer.getCoin());
        c.setName(customer.getName());
        return c;
    }
}

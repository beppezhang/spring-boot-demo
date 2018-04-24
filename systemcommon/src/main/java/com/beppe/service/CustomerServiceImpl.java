package com.beppe.service;

import com.beppe.common.BaseService;
import com.beppe.dao.DB1.CustomerMapper;
import com.beppe.dao.DB1.ExchangeOrderMapper;
import com.beppe.entity.DB1.Customer;
import com.beppe.entity.DB1.ExchangeOrder;
import com.beppe.exception.CommonException;
import com.dubbo.iservice.DubboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class CustomerServiceImpl extends BaseService{

    @Autowired
    private RedisTemplate redisTemplate;

//    @Autowired
//    private DubboService dubboService;

    @Resource
    private CustomerMapper cutomerMapper;

    @Resource
    private ExchangeOrderMapper exchangeOrderMapper;

    public int saveCustomer(){
        Customer customer = new Customer();
        customer.setId(UUID.randomUUID().toString());
        customer.setCoin(200);
        customer.setName("aaa");
        customer.setPhoneNum("123456789");
        int insert = cutomerMapper.insert(customer);
        return insert;

    }

    public int order(String token) throws CommonException {
        String mobile="15618962870";
//        校验token  如果token 和Redis中的一致则token有效
        String str = (String)redisTemplate.opsForValue().get("token" + mobile);
        if(!token.equals(str)){
            thrown("2003","token校验失败");
        }
//        插入一条下单记录
        ExchangeOrder order = new ExchangeOrder();
        order.setId(UUID.randomUUID().toString());
//        order.setName("order");
        order.setOrderId(UUID.randomUUID().toString());
        order.setCreateTime(new Date());
        int insert = exchangeOrderMapper.insert(order);
//        扣减用户积分
//        cstomerMapper.updateCustomerScore("ed433fa0-1c72-4576-802e-c8f133564167");
//        delete token
        redisTemplate.delete("token" + mobile);
        return insert;


    }

    public String getToken(String mobile){
        String str = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set("token"+mobile,str);
        redisTemplate.expire("token"+mobile,50000, TimeUnit.MILLISECONDS);
        return str;

    }

//    public void getCustomer(String id){
//        com.dubbo.model.Customer customer = dubboService.selectCustomer(id);
//        System.out.println(customer.getName());
//
//
//    }
}

package com.dubbo.iservice;

import com.dubbo.model.Customer;

/**
 * Created by zhangshangliang on 2018/1/3.
 */
public interface DubboService {

    Customer selectCustomer(String id);
}

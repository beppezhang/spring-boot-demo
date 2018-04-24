package com.dubbo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

/**
 * Created by zhangshangliang on 2018/1/3.
 */
@Configuration
@PropertySource("classpath:dubbo.properties")
@ImportResource({ "classpath:provider.xml" })
@MapperScan("com.dubbo.dao")
public class DubboConfig {

}

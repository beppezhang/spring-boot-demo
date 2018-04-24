package com.beppe.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

/**
 * Created by zhangshangliang on 2018/1/4.
 * 作为redis的工具类使用: 1 操作各种数据结构  2: redis
 */

@Component
public class RedisUtil {

    @Autowired
    private RedisTemplate redisTemplate;



    public String getStringValue(String key){
        String str = (String)redisTemplate.opsForValue().get(key);
        return str;
    }

//    redis 分布式锁
//    public boolean globleLock(){
//
//    }






}

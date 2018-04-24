package com.beppe.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

/**
 * Created by zhangshangliang on 2018/1/3.
 */

@Configuration
@MapperScan(basePackages = {"com.beppe.dao.DB2"},sqlSessionFactoryRef = "DB2sqlSessionFactory")
@EnableTransactionManagement
public class DB2Config {

        @Bean(name = "DB2datasource")
//        @Primary
        @ConfigurationProperties(prefix = "spring.datasource.DB2") // application.properteis中对应属性的前缀
        public DataSource dataSource() {
            return DataSourceBuilder.create().build();
        }

        @Bean(name = "DB2sqlSessionFactory")
//        @Primary
        public SqlSessionFactory futuresDBSqlSessionFactory(@Qualifier("DB2datasource") DataSource dataSource) throws Exception {
            SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
            bean.setDataSource(dataSource);
            bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath*:com/beppe/mapper/DB2/*.xml"));
            return bean.getObject();
        }

        @Bean(name = "DB2TransactionManager")
//        @Primary
        public DataSourceTransactionManager futuresDBTransactionManager(@Qualifier("DB2datasource") DataSource dataSource) {
            return new DataSourceTransactionManager(dataSource);
        }
    }


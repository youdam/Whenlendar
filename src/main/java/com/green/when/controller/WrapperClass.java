package com.green.when.controller;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WrapperClass<E> {
    private E data;
}

// 이렇게 data라고 이름이 되면, frontend에서 이거, wrapperclass로 리턴된걸 받을 떄
// respons.data 로 접근하면됨 (?) 직접봐라 이따가 ;;
import React, { useEffect, useState } from "react";
import { userRows } from 'src/data';
import List from 'src/components/list/List';
import { getAccountList } from 'src/redux/apiCalls';
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
    const dispatch = useDispatch();
    const { accountList, isFetching } = useSelector(state => state.account)
    useEffect(() => {
        if (isFetching === false) getAccountList(dispatch)
    }, [])
    return (
        <>
            {accountList && accountList.length > 0 && !isFetching && <List data={accountList}
                isUserList={true} />}
        </>
    )
}
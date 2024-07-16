import React, { useEffect, useMemo, useState } from 'react';
import './Home.scss';
import Info from 'src/components/info/Info';
import Chart from 'src/components/chart/Chart';
import Small from 'src/components/small/Small';
import Large from 'src/components/large/Large';
import { userRequest } from 'src/requestMethods';

export default function Home() {
    const [userStats, setUserStats] = useState([])
    const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"], []);
    const [income, setIncome] = useState(0);
    const [incre, setIncre] = useState(false);
    const [percent, setPercent] = useState(0)

    // const getUserStats = async () => {
    //     try {
    //         const res = await userRequest.get('/api/users/stats')
    //         res.data.data.map(item => {
    //             setUserStats(prev => {
    //                 return [
    //                     ...prev,
    //                     {
    //                         name: MONTHS[item._id - 1],
    //                         "Active User": item.total
    //                     }
    //                 ]
    //             })
    //         })
    //         console.log('statatat', res.data.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // const getIncome = async () => {
    //     try {
    //         const res = await userRequest.get('/api/orders/income')
    //         const income = res.data.income; // objects array [{_id: 1, total: 0}, {}, {}]
    //         const check = income.length > 0 ? true : false
    //         if (check) {
    //             setIncome(income[income.length - 1].total)
    //             setIncre(income[income.length - 1].total > income[0].total ? true : false)
    //             setPercent((income[income.length - 1].total * 100) / income[0].total - 100)
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     getUserStats()
    //     getIncome()
    // }, [MONTHS, userStats])

    return (
        <div className="homeContainer">
            <div className="infos">
                <Info title={'Revenue'}
                    income={`${income} VND`}
                    incre={incre}
                    detail={`${Math.floor(percent)}%`}
                />
                <Info title={'Sales'}
                    income={'$2,854'}
                    incre={false}
                    detail={12.4}
                />
                <Info title={'Cost'}
                    income={'$4,664'}
                    incre={true}
                    detail={1.4}
                />
            </div>
            {/* <Chart title={'Active User Details'} data={userStats} dataKey={'Active User'} /> */}
            <div className="user">
                <Small />
                <Large />
            </div>
        </div>
    )
}
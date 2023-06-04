'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import Login from '../components/login'

export default function mainpage(){
    return (
        <div className={styles.maindiv}>
            <div className={styles.firstdiv}>
                <div className={styles.imgdiv}>
                    <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="facebok" />
                </div>
                <div className={styles.qoute}>
                    Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                </div>
            </div>
            <div className={styles.secondiv}>
                <Login/>
            </div>
        </div>
    )
}
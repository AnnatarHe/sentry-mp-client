import React, { useState, useEffect } from 'react'
import { View, Image, getSystemInfo } from 'remax/wechat'
// const defaultBackIcon = require('../../assets/back.png')
import defaultBackIcon from '../../assets/back.png'

import './style.less'

type NavigationBarProps = {
  containerClassName?: string
  homeIconClassName?: string
  hasHolder: boolean
  homeIcon?: string
  onBack?: () => void
  children?: any
  left?: React.ReactElement
}


function useStatusBarSize(hasHolder: boolean) {
  const [barHeight, setBarHeight] = useState(0)
  const [platformHeight, setPlatformHeight] = useState(8)

  useEffect(() => {
    getSystemInfo().then(resp => {
      setBarHeight(resp.statusBarHeight * 2)
      setPlatformHeight(resp.platform !== 'ios' ? 8 : 6)
    })
  }, [])

  const contentHeight = 32 * 2 + platformHeight * 2

  return {
    barHeight,
    contentHeight,
    containerHeight: hasHolder ? (contentHeight + barHeight) : 0
  }
}

function NavigationBar(props: NavigationBarProps) {

  const { barHeight, contentHeight, containerHeight } = useStatusBarSize(props.hasHolder)

  return (
    <View
      className="ui-navigation"
      style={{ height: containerHeight + 'px' }}
    >
      <View className={`navigation-bar ${props.containerClassName}`}>
        <View className="bg" style={{ height: containerHeight + 'px' }} />
        <View className="holder" style={{ height: barHeight + 'px' }} />
        <View
          className="bar"
          style={{ height: contentHeight + 'px' }}
        >
          {props.left ?? (
            <View
              className="touchable"
              onClick={props.onBack}
            >
              <Image
                src={props.homeIcon || defaultBackIcon}
                className={`home-icon ${props.homeIconClassName}`}
              />
            </View>
          )}
          {props.children && (
            <View
              className="title"
            >
              {props.children}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default NavigationBar

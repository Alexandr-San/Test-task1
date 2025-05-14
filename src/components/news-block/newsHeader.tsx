import React, { useState } from 'react'
import { Tag, Typography, Tooltip, Space, Button, Popover } from 'antd'
import { UserOutlined, ReadOutlined, InfoCircleOutlined } from '@ant-design/icons'
import WorldFlag from 'react-world-flags'
import Checkbox from 'antd/es/checkbox/Checkbox'

const { Title, Text, Link } = Typography

type Props = {
  TI: string,
  URL: string,
  DOM: string,
  LANG?: string,
  DP: string,
  KW?: any[],
  FAV: string,
  AU: string[],
  CNTR?: string,
  CNTR_CODE?: string,
  REACH: number,
  SENT?: string,
  TRAFFIC?: any[],
  sentimentColorMap: Record<string, string>
}

export const NewsSnippetMainBlock: React.FC<Props> = ({
  TI, URL, DOM, LANG, DP, FAV, AU, CNTR, CNTR_CODE, REACH, SENT, TRAFFIC, sentimentColorMap
}) => {
  const formattedDate = DP ? new Date(DP).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [checked, setChecked] = useState(false)

  return (
    <div className="news-snippet-main-block">
      {/* Верхняя meta-info */}
      <div className="meta-info">
        <div className="meta-left">
          <Space size="middle" wrap={false} style={{ width: '100%', overflow: 'hidden' }}>
            <Tooltip title="Дата публикации">
              <Text className="meta-text date">
                <span className="day">{formattedDate.split(' ')[0]}</span>
                <span className="month-year">{formattedDate.split(' ').slice(1).join(' ')}</span>
              </Text>
            </Tooltip>
            <Tooltip title="Охват">
              <Text className="meta-text reach">
                <span className="value">{REACH.toLocaleString()}</span>
                <span className="label">Reach</span>
              </Text>
            </Tooltip>
            {TRAFFIC && TRAFFIC.length > 0 && (
              <Tooltip title="Топ трафик">
                <Text className="meta-text traffic-text">
                  <span>Top Traffic: </span>
                  {TRAFFIC.map((item, index) => (
                    <React.Fragment key={item.value}>
                      <span className="country">{item.value}</span>{' '}
                      <span className="percent">{(item.count * 100).toFixed(0)}%</span>
                      {index < TRAFFIC.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </Text>
              </Tooltip>
            )}
          </Space>
        </div>

        {/* Тэг новости */}
        <div className="meta-right" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {SENT && (
            <Tag color={sentimentColorMap[SENT as keyof typeof sentimentColorMap] || 'default'} className="sentiment-tag">
              {SENT.charAt(0).toUpperCase() + SENT.slice(1).toLowerCase()}
            </Tag>
          )}
          <Popover
            content={<div style={{ maxWidth: 200 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius ut massa eu gravida. Duis mi.</div>}
            title="Lorem"
            trigger="click"
            visible={popoverVisible}
            onVisibleChange={setPopoverVisible}
          >
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              aria-label="Информация"
              style={{ padding: 0, fontSize: 18 }}
            />
          </Popover>
          <Checkbox
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            aria-label="Включить/выключить"
          />
        </div>
      </div>

      {/* Заголовок */}
      <div className="header">
        <div className="title-domain">
          <Link href={URL} target="_blank" rel="noopener noreferrer">
            <Title level={4} ellipsis={{ rows: 2 }}>{TI}</Title>
          </Link>
        </div>
      </div>

      {/* Нижняя meta-info */}
      <div className="meta-info">
        <Space size="middle" wrap>
          <Tooltip title="Источник">
            <Typography.Link href={`https://${DOM}`} target="_blank" rel="noopener noreferrer" className="meta-text source">
              <img
                src={FAV}
                alt="favicon"
                style={{ width: 16, height: 16, objectFit: 'contain', borderRadius: 2 }}
              />
              {DOM}
            </Typography.Link>
          </Tooltip>
          <Tooltip title="Страна">
            <Text className="meta-text country">
              <WorldFlag code={CNTR_CODE} height="10" style={{ marginRight: 6 }} />
              {CNTR}
            </Text>
          </Tooltip>
          {LANG && (
            <Tooltip title="Язык">
              <Text className="meta-text language">
                <ReadOutlined style={{ marginRight: 4 }} />
                {LANG}
              </Text>
            </Tooltip>
          )}
          {AU.length > 0 && (
            <Tooltip title="Автор(ы)">
              <Text className="meta-text authors" type="secondary">
                <UserOutlined style={{ marginRight: 6 }} />
                {AU.join(', ')}
              </Text>
            </Tooltip>
          )}
        </Space>
      </div>
    </div>
  )
}

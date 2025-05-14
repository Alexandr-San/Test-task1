import { useState } from 'react'
import { Tag, Typography, Button } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { IData_SnippetNews } from '../../queries/getNews/types'
import './NewsBlock.scss'
import { NewsSnippetMainBlock } from './newsHeader'

const { Paragraph } = Typography
const sentimentColorMap = {
  positive: 'green',
  neutral: 'gray',
  negative: 'red',
}

export const SnippetNewsBlock = ({ data }: { data: IData_SnippetNews }) => {
  const {
    TI,
    URL,
    DOM,
    LANG,
    DP,
    FAV,
    KW,
    AU,
    CNTR,
    CNTR_CODE,
    REACH,
    SENT,
    TRAFFIC,
    HIGHLIGHTS,
    DUPLICATES_COUNT,
    DUPLICATES
  } = data;

  const [expanded, setExpanded] = useState(false)
  const limit = 7; // сколько тегов показывать по умолчанию

  const visibleTags = expanded ? KW : KW.slice(0, limit)
  const hiddenCount = KW.length - limit

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selected, setSelected] = useState<'By Date' | 'By Relevance'>('By Relevance')
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
  const selectOption = (option: 'By Date' | 'By Relevance') => {
    setSelected(option)
    setDropdownOpen(false)
  }

  const [shownDuplicates, setShownDuplicates] = useState(1)
  const duplicates = DUPLICATES || []
  const duplicatesToShow = duplicates.slice(0, shownDuplicates)

  const showMoreDuplicates = () => {
    setShownDuplicates(prev => Math.min(prev + 10, duplicates.length))
  }
  const showLessDuplicates = () => {
    setShownDuplicates(1)
  }

  function renderHighlightText(text: string) {

    const regex = /<kw>(.*?)<\/kw>/g;
  
    const parts = [];
    let lastIndex = 0;
    let match;
  
    while ((match = regex.exec(text)) !== null) {

      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      parts.push(
        <span key={match.index} className="highlighted-keyword">
          {match[1]}
        </span>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
  
    return parts;
  }  

  return (
    <div className="snippet-news-block">

      {/* Хедэр */}
      <NewsSnippetMainBlock
        TI={TI}
        URL={URL}
        DOM={DOM}
        LANG={LANG}
        DP={DP}
        FAV={FAV}
        KW={KW}
        AU={AU}
        CNTR={CNTR}
        CNTR_CODE={CNTR_CODE}
        REACH={REACH}
        SENT={SENT}
        TRAFFIC={TRAFFIC}
        sentimentColorMap={sentimentColorMap}
      />

      {/* Хайлайты */}
      <Paragraph className="abstract" ellipsis={{ rows: 3, expandable: true, symbol: 'Show more' }}>
        {renderHighlightText(HIGHLIGHTS.join('\n\n'))}
      </Paragraph>

      {/* Теги */}
      <div className="tags">
        {visibleTags.map(tag => (
          <Tag key={tag.value}  className="keyword-tag">
            {tag.value} ({tag.count})
          </Tag>
        ))}

        {KW.length > limit && !expanded && (
          <Button type="link" onClick={() => setExpanded(true)} className="show-all-btn">
            Show all +{hiddenCount}
          </Button>
        )}

        {expanded && (
          <Button type="link" onClick={() => setExpanded(false)} className="show-all-btn">
            Show less
          </Button>
        )}
      </div>

      {/* Кнопка "Оригинальный ресурс" */}
      <div className="original-source">
        <Button type="primary" href={URL} target="_blank" rel="noopener noreferrer">
          Original Source
        </Button>
        {typeof DUPLICATES_COUNT === 'number' && (
          <div className="duplicates-count">
            <span className="duplicates-text">
              Duplocates: <span>{DUPLICATES_COUNT}</span>
            </span>

            <div className="dropdown-selector">
              <button className="selector-button" onClick={toggleDropdown} type="button" aria-haspopup="listbox" aria-expanded={dropdownOpen}>
                <span>{selected}</span>
                {dropdownOpen ? <UpOutlined /> : <DownOutlined />}
              </button>

              {dropdownOpen && (
                <ul className="selector-options" role="listbox">
                  {['By Date', 'By Relevance'].map(option => (
                    <li
                      key={option}
                      role="option"
                      aria-selected={selected === option}
                      tabIndex={0}
                      className={selected === option ? 'selected' : ''}
                      onClick={() => selectOption(option as 'By Date' | 'By Relevance')}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          selectOption(option as 'By Date' | 'By Relevance')
                        }
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Блок с дубликатами */}
      {duplicates.length > 0 && (
        <div className="duplicates-block">
          {duplicatesToShow.map((dup, idx) => (
            <div key={dup.ID} className="duplicate-item">
              <NewsSnippetMainBlock
                TI={dup.TI}
                URL={dup.URL}
                DOM={dup.DOM}
                DP={dup.DP}
                FAV={dup.FAV}
                AU={dup.AU || []}
                CNTR={dup.CNTR}
                CNTR_CODE={dup.CNTR_CODE}
                REACH={dup.REACH}
                sentimentColorMap={sentimentColorMap}
              />
            </div>
          ))}

          <Button
            className="show-more-duplicates"
            block
            onClick={shownDuplicates < duplicates.length ? showMoreDuplicates : showLessDuplicates}
          >
            {shownDuplicates < duplicates.length ? 'View Duplicates' : 'Hide'}
          </Button>
        </div>
      )}
    </div>
  )
}
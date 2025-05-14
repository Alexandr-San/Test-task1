// интерфейс для данных о новостях
export interface IData_SnippetNews {
  ID              : number                    // идентификатор новости
  TI              : string                    // заголовок новости
  AB              : string                    // содержимое новости
  URL             : string                    // ссылка на новость
  DOM             : string                    // домен
  DP              : string                    // дата и время публикации новости в формате "%Y-%m-%dT%H:%M:%S")
  LANG            : string                    // язык новости
  REACH           : number                    // охват новости
  KW              : IData_TagItem[]           // ключевые слова
  AU              : string[]                  // автор новости
  CNTR            : string                    // страна
  CNTR_CODE       : string                    // код страны
  SENT            : string                    // сантимент новости
  TRAFFIC         : IData_TrafficItem[]       // траффик из стран
  FAV             : string                    // ссылка на иконку
  HIGHLIGHTS      : string[]                  // блоки содержимого новости с ключевыми словами
  DUPLICATES_COUNT: number                    // количетсво дубликатов
  DUPLICATES      : IData_DuplicatesItem[]    // дубликаты новости
}

// тэг для сниппета
export interface IData_TagItem {
  value       : string                        // название тега
  count       : number                        // кол-во тегов с указанным названием
}

// траффик для сниппета
export interface IData_TrafficItem {
  value       : string                        // название страны-источник траффика
  count       : number                        // объём траффика для указанной страны
}

export interface IData_DuplicatesItem {
  ID              : number                    // идентификатор новости
  TI              : string                    // заголовок новости
  URL             : string                    // ссылка на новость
  DP              : string                    // дата и время публикации новости в формате "%Y-%m-%dT%H:%M:%S")
  FAV             : string                    // ссылка на иконку
  DOM             : string                    // домен
  REACH           : number                    // охват новости
  AU              : string[]                  // автор новости
  CNTR            : string                    // страна
  CNTR_CODE       : string                    // код страны
}

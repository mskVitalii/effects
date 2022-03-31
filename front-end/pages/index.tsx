import React, { useState, useEffect } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { EEffects } from '../src/interfaces/IEffects'
import EffectsSettings from '../src/components/effectsSettigns/EffectsSettings'
import HeadSEO from '../src/utils/HeadSEO'
import Layers from '../src/components/layers/layers'
import LayersSettings from '../src/components/layersSettings/layersSettings'
import IContentPage, { ELanguages } from '../src/interfaces/IContentPage'
import EditorHeader from '../src/components/header/editorHeader'
import Loader from '../src/components/loader/loader'
import styles from '../styles/Editor.module.scss'
import Research from '../src/components/research/research'
import Requests from '../src/utils/Requests'


const mockData: IContentPage = {
  layers: [{
    content: {
      [ELanguages.ru_RU]: { name: "Задний фонк", url: "/mock/p1.png" }
    },
    effects: {
      [EEffects.parallax]: { value: 0.5 },
      [EEffects.blur]: { value: 2.5 }
    }
  }, {
    content: {
      [ELanguages.ru_RU]: { name: "Персонаж", url: "/mock/Scott-p1.png" }
    },
    effects: {
      [EEffects.parallax]: { value: 0.6 }
    }
  }]
}

type Props = {
  page: IContentPage
  isEdit: boolean
  resolvedUrl: string
}

const Editor: NextPage<Props, {}> = ({ page, isEdit, resolvedUrl }) => {
  const [editMode, setEditMode] = useState<boolean>(isEdit);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentLayer, setCurrentLayer] = useState(0)
  const [contentPage, setContentPage] = useState(page);
  const [currentLanguage, setCurrentLanguage] = useState(ELanguages.ru_RU);

  //* Загрузка контента
  useEffect(() => {
    const url = new URL(window.location.href);
    const isEdit = url.searchParams.has("edit") || url.searchParams.get("id") === null
    setEditMode(isEdit)
    setTimeout(() => setLoading(false), 1400)
  }, [])

  //* Пока чудо не произошло, показываем загрузку
  if (editMode === undefined || loading) return <Loader />

  return (
    <div className={`${styles.editorContainer} ${editMode ? styles.editorTime : styles.showTime}`}>
      <HeadSEO
        title="Effects"
        description="Manga&comics with effects"
        keywords={["Comics", "manga", "effects", "parallax", "2.5d"]}
        author="🔮 Effects team"
        iconImg="/icon.svg"
        socialNetworkImg="/icon.svg" />

      {/* Поле для публикации и аккаунта */}
      {editMode &&
        <EditorHeader
          contentPage={contentPage} />}

      {/* Настроки эффектов */}
      {editMode &&
        <EffectsSettings
          contentPage={contentPage}
          setContentPage={setContentPage}
          currentLayer={currentLayer} />}

      {/* Сами слои */}
      <Layers contentPage={contentPage} currentLanguage={currentLanguage} />

      {/* Настройки слоёв */}
      {editMode &&
        <LayersSettings
          contentPage={contentPage} setContentPage={setContentPage}
          currentLayer={currentLayer} setCurrentLayer={setCurrentLayer} />}

      {/* Призыв пройти опрос */}
      {!editMode && <Research url={resolvedUrl} />}
    </div>)
}

export const getServerSideProps: GetServerSideProps = async ({ query, resolvedUrl }) => {
  //* Установка значений
  const id = query["id"] as string
  let isEdit = Object.hasOwn(query, "edit")
  if (id === undefined) isEdit = true
  let page: IContentPage | string = mockData
  // console.log('getServerSideProps :>> ', query, id, isEdit, resolvedUrl)

  //* Получение контента
  if (id) {
    page = await Requests.getPage(id)
    // console.log("page", page)
    //* Если контента не существует → редирект на 404
    if (page === "ERROR")
      return { redirect: { destination: '/404', permanent: true } }
    //* Если контента не существует, но мы хотим в редактор → попадаем в редактор
    else if (page === "ERROR" && isEdit)
      page = mockData
  }

  return { props: { page, isEdit, resolvedUrl } }
}

export default Editor

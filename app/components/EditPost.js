import React, { useState, useEffect } from "react"
import { useImmerReducer } from "use-immer"
import { Link, useParams } from "react-router-dom"
import Axios from "axios"
import Page from "./Page"
import LoadingDotsIcon from "./LoadingDotsIcon"

function EditPost() {
  const originalState = {
    title: {
      value: "",
      hasErrors: false,
      message: ""
    },
    body: {
      value: "",
      hasErrors: false,
      message: ""
    },
    isFetching: true,
    savedIsLoading: false,
    id: useParams().id,
    sendCount: 0
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title
        draft.body.value = action.value.body
        draft.isFetching = false
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, originalState)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${state.id}`, { cancelToken: ourRequest.token })
        dispatch({ type: "fetchComplete", value: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    fetchPost()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    )

  return (
    <Page title={"Edit Post"}>
      <form>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input value={state.title.value} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea name="body" id="post-body" className="body-content tall-textarea form-control" type="text" value={state.body.value} />
        </div>

        <button className="btn btn-primary">Save Updates</button>
      </form>
    </Page>
  )
}

export default EditPost

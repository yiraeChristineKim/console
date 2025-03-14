import { Card, PageSection } from '@patternfly/react-core'
import { useState } from 'react'
import { ToggleTab } from './ToggleTab'
import { CodeEditorBlock } from './CodeEditorBlock'
import { Box } from '@mui/material'
import { ResultBlock } from './ResultBlock'

export default function Dryrun() {
  const [selectedTabId, setSelectedTabId] = useState('policy')
  const [policyCode, setPolicyCode] = useState('# Policy Yaml')
  const [desiredStatus, setDesiredStatus] = useState('# Desired status Yaml Optional')
  const [mappings, setMappings] = useState('# Mappings Yaml Optional')
  const [resourcesCode, setResourcesCode] = useState('# Input resources Yaml')
  const [answer, setAnswer] = useState('')
  const handleItemClick = (event: any) => {
    setSelectedTabId(event?.currentTarget?.id)
  }
  const [error, setError] = useState('')

  const onPlayClick = () => {
    setAnswer('')
    setError('')
    fetch('/dryrun', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        policy: policyCode,
        inputResources: resourcesCode,
        mapping: mappings,
        desiredStatus: desiredStatus,
      }),
    })
      .then((response: Response) => {
        if (!response.ok) {
          response.text().then((err) => {
            setError(err)
            console.log(err)
          })
        } else {
          response.json().then((data: any) => {
            setAnswer(data.result)
            console.log(data.result)
            console.log(data.message)
          })
        }
      })
      .catch((err: Error) => {
        setError(err.toString())
      })
    // fetch('/dryrun/health', {
    //   method: 'GET',
    //   mode: 'no-cors',
    //   headers: {
    //     Accept: 'text/html',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // })
    //   .then((response) => response.text())
    //   .then((response) => {
    //     console.log(response)
    //   })
  }

  return (
    <>
      <PageSection>
        <Box mb={2}>
          <ToggleTab {...{ handleItemClick, selectedTabId }} />
        </Box>
        <Card>
          {selectedTabId === 'policy' && <CodeEditorBlock onCodeChange={setPolicyCode} code={policyCode} />}
          {selectedTabId === 'resources' && <CodeEditorBlock onCodeChange={setResourcesCode} code={resourcesCode} />}
          {selectedTabId === 'desired' && <CodeEditorBlock onCodeChange={setDesiredStatus} code={desiredStatus} />}
          {selectedTabId === 'mappings' && <CodeEditorBlock onCodeChange={setMappings} code={mappings} />}
        </Card>
      </PageSection>
      <PageSection>
        <Card>
          <ResultBlock {...{ answer, setAnswer, onPlayClick, error }} />
        </Card>
      </PageSection>
    </>
  )
}

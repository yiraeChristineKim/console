import { Button, ClipboardCopyButton } from '@patternfly/react-core'
import './dryrun.css'
import { PlayIcon } from '@patternfly/react-icons'
import { useState } from 'react'
import { Box } from '@mui/material'
import Ansi from 'ansi-to-react'

export const ResultBlock = ({ answer, error, onPlayClick }: { answer: string; error: string; onPlayClick: any }) => {
  const [copied, setCopied] = useState(false)

  const clipboardCopyFunc = (_: any, text: string) => {
    navigator.clipboard.writeText(text.toString())
  }

  const onCopyClick = (event: any, text: string) => {
    clipboardCopyFunc(event, text)
    setCopied(true)
  }

  return (
    <Box px={2} py={1}>
      <Actions {...{ answer, copied, setCopied, onCopyClick, onPlayClick }} />
      {answer && (
        <Box className="code-content" p={1}>
          <Ansi>{answer}</Ansi>
        </Box>
      )}

      <Box>{error}</Box>
    </Box>
  )
}

const Actions = ({
  answer,
  copied,
  onCopyClick,
  setCopied,
  onPlayClick,
}: {
  answer: string
  copied: boolean
  onCopyClick: any
  onPlayClick: any
  setCopied: any
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex' }}>
      {answer && (
        <ClipboardCopyButton
          id="expandable-copy-button"
          textId="code-content"
          aria-label="Copy to clipboard"
          onClick={(e) => onCopyClick(e, answer)}
          exitDelay={copied ? 1500 : 600}
          maxWidth="110px"
          variant="plain"
          onTooltipHidden={() => setCopied(false)}
        >
          {copied ? 'Successfully copied to clipboard!' : 'Copy to clipboard'}
        </ClipboardCopyButton>
      )}
      <Button variant="plain" aria-label="Play icon" onClick={onPlayClick}>
        <PlayIcon />
      </Button>
    </Box>
    <Box>{answer && 'status'}</Box>
  </Box>
)

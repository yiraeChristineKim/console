import { CodeEditor, Language } from '@patternfly/react-code-editor'
import './dryrun.css'

export const CodeEditorBlock = ({ onCodeChange, code }: { onCodeChange: (value: string) => void; code: string }) => {
  return (
    <CodeEditor
      isUploadEnabled
      isDownloadEnabled
      isCopyEnabled
      isLanguageLabelVisible
      isLineNumbersVisible
      isMinimapVisible
      isDarkTheme
      language={Language.yaml}
      height="400px"
      onCodeChange={onCodeChange}
      code={code}
    />
  )
}

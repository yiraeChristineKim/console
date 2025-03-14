import { ToggleGroup, ToggleGroupItem } from '@patternfly/react-core'

export const ToggleTab = ({
  selectedTabId,
  handleItemClick,
}: {
  selectedTabId: string
  handleItemClick: (event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent, selected: boolean) => void
}) => {
  return (
    <ToggleGroup aria-label="Select a code-editor to upload file">
      <ToggleGroupItem
        text="Policy"
        buttonId="policy"
        isSelected={selectedTabId === 'policy'}
        onChange={handleItemClick}
      />
      <ToggleGroupItem
        text="Input resources"
        buttonId="resources"
        isSelected={selectedTabId === 'resources'}
        onChange={handleItemClick}
      />
      <ToggleGroupItem
        text="Mappings"
        buttonId="mappings"
        isSelected={selectedTabId === 'mappings'}
        onChange={handleItemClick}
      />
      <ToggleGroupItem
        text="Desired status"
        buttonId="desired"
        isSelected={selectedTabId === 'desired'}
        onChange={handleItemClick}
      />
    </ToggleGroup>
  )
}

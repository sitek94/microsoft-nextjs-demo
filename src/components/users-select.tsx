import * as React from 'react'

import {ConversationMember} from '@microsoft/microsoft-graph-types'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import {Theme, useTheme} from '@mui/material/styles'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

export default function UsersSelect({users}: {users: ConversationMember[]}) {
  const theme = useTheme()
  const [selected, setSelected] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {value} = event.target
    setSelected(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-name-label">Choose people</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Choose people" />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        }}
      >
        {users.map(({id, displayName}) => {
          const value = displayName || ''
          return (
            <MenuItem
              key={id}
              value={value}
              style={getStyles(value, selected, theme)}
            >
              {value}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

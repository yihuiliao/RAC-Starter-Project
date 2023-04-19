import {Button, Item, Label, ListBox, Popover, Select, SelectValue} from 'react-aria-components';

export function App() {
  return (
    <div>
        <h1 className="text-3xl">Hello world!</h1>
        <Select>
          <Label>Favorite Animal</Label>
          <Button>
            <SelectValue />
            <span aria-hidden="true">▼</span>
          </Button>
          <Popover>
            <ListBox>
              <Item>Cat</Item>
              <Item>Dog</Item>
              <Item>Kangaroo</Item>
            </ListBox>
          </Popover>
        </Select>
    </div>
  )
}
import styled from 'styled-components';

// Lightweight replacement for @mui/lab Timeline — same vertical line + dot look.
// `dotSide` controls which side the dot/line sits on relative to the content.
const List = styled.div`
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
`;

const Separator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  flex-shrink: 0;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #854ce6;
  flex-shrink: 0;
  margin-top: 20px;
`;

const Connector = styled.div`
  width: 2px;
  flex: 1;
  min-height: 24px;
  background: #854ce6;
  margin-top: 4px;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  padding: 12px 16px;
`;

const Timeline = ({ items, renderItem, dotSide = 'left' }) => {
  const separator = (isLast) => (
    <Separator>
      <Dot />
      {!isLast && <Connector />}
    </Separator>
  );
  return (
    <List>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Item key={item.id ?? index}>
            {dotSide === 'left' && separator(isLast)}
            <Content>{renderItem(item)}</Content>
            {dotSide === 'right' && separator(isLast)}
          </Item>
        );
      })}
    </List>
  );
};

export default Timeline;

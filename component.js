function MyComponent (props) {
  const {notifySelectedPlayer, players} = props
  const [selectedPlayer, setSelectedPlayer] = useState(() => (
    players?.length ? players[0] : null
  ))

  useEffect(() => {
    setSelectedPlayer(players?.length ? players[0] : null)
  }, [players])

  const handlePlayerSelection = useCallback((player) => {
    setSelectedPlayer(player)
    notifySelectedPlayer(player)
  }, [notifySelectedPlayer])

  return (
    <div className='dashboard-container flex-wrap'>
      <PlayerCard
        cardType='basic'
        className='red-border'
        player={selectedPlayer}
      />
      <PlayerList
        className='border-black-2 ellipsis word-wrap'
        players={players}
        listType='basic'
        onSelection={handlePlayerSelection}
      />
    </div>
  )
}
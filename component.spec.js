describe('<MyComponent />', function () {
  let wrapper
  const playerList = [{name: 'A', score: 1, rating: 'a'}, {name: 'B', score: 1, rating: 'b'}]

  beforeEach(function () {
    wrapper = shallow(<MyComponent
      notifySelectedPlayer={callbackSpy}
      players={playerList}
    />)
  })

  it('should have proper props', function () {
    expect(wrapper.props()).to.deep.equal({
      className: 'dashboard-container flex-wrap'
    });
  })

  describe('checking for PlayerCard', function () {
    it('should render <PlayerCard />', function () {
      expect(wrapper.find(PlayerCard)).to.have.lengthOf(1);
    })
  
    it('should render PlayerCard with expected props', function () {
      shouldHaveProps(wrapper.find(PlayerCard), {
        cardType: 'basic',
        className: 'red-border',
        player: playerList[0]
      });
    })
  })

  describe('checking for PlayerList', function () {
    it('should render <PlayerList />', function () {
      expect(wrapper.find(PlayerList)).to.have.lengthOf(1);
    })
  
    it('should render PlayerList with expected props', function () {
      shouldHaveProps(wrapper.find(PlayerList), {
        className: 'border-black-2 ellipsis word-wrap',
        players: players,
        listType: 'basic'
      })
    })
  })

  describe('checking for item selection action on PlayerList', function () {
    beforeEach(function () {
      wrapper.find(PlayerList).simulate('selection', playerList[1])
    })

    shouldHaveProps(wrapper.find(PlayerCard), {
      cardType: 'basic',
      className: 'red-border',
      player: playerList[1]
    })

    it('should invoke notifySelectedPlayer', function () {
      expect(callbackSpy).to.have.callCount(1)
      expect(callbackSpy).to.have.been.calledWith(playerList[1])
    })
  })

  it('should updating players to [] will pass null as player to PlayerCard', function () {
    wrapper.setProps({players: []})
    expect(wrapper.find(PlayerCard).prop('player')).to.equal(null);
  })

  it('should updating players will pass players[0] as player to PlayerCard', function () {
    const updatedPlayers = [{name: 'X', score: 10, rating: 'x'}, {name: 'Y', score: 11, rating: 'b1'}]
    wrapper.setProps({players: updatedPlayers})
    expect(wrapper.find(PlayerCard).prop('player')).to.equal(updatedPlayers[0]);
  })
})
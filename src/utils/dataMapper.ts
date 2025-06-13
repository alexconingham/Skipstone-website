// Utility to map JSON data to website format
import diceData from '../../data/dice_data.json'
import mementoData from '../../data/memento_data.json'
import enemyData from '../../data/enemy_data.json'
import watchData from '../../data/watch_data.json'

// Map dice data
export const getDiceData = () => {
  const mappedDice = diceData.dice.map((die: any) => ({
    file: `${die.id}.png`,
    name: die.display_name || die.name,
    rarity: die.rarity,
    description: die.effect_description
  }))

  // Add the life die manually since it exists as a file but might not be in JSON
  // Check if it already exists to avoid duplicates
  const hasLifeDie = mappedDice.some(die => die.file === 'life.png')
  if (!hasLifeDie) {
    mappedDice.push({
      file: 'life.png',
      name: 'Life Die',
      rarity: 'rare',
      description: 'Restores health when rolled.'
    })
  }

  return mappedDice
}

// Map memento data  
export const getMementoData = () => {
  return mementoData.map((memento: any) => {
    // Handle special cases where JSON filename doesn't match actual file
    let imageFile = memento.image
    if (memento.id === 'broken_toy' && memento.image === 'broken_toy_memento.png') {
      imageFile = 'broken_toy.png'
    }
    // Add more special cases as needed
    if (memento.image === 'salt_shells.png') {
      imageFile = 'salt_shell.png'  // Note: singular vs plural
    }
    if (memento.image === 'sack_of_coins.png') {
      imageFile = 'sock_of_coins.png'  // Note: sack vs sock
    }
    if (memento.image === 'heavy_keychain.png') {
      imageFile = 'gate_lock.png'  // Different naming
    }
    if (memento.image === 'weighted_die.png') {
      imageFile = 'stress_ball.png'  // Different item entirely
    }
    if (memento.image === 'heartburn.png') {
      imageFile = 'holy_water.png'  // Different naming
    }
    if (memento.image === 'introspection.png') {
      imageFile = 'shifting_photo.png'  // Different naming
    }
    
    return {
      file: imageFile,
      name: memento.name,
      rarity: memento.rarity,
      description: memento.description,
      tooltip: memento.tooltip
    }
  })
}

// Map watch data
export const getWatchData = () => {
  return watchData.map((watch: any) => {
    // Handle the special case of calculator_watch which has a different filename
    let imageFile = watch.image
    if (watch.id === 'calcu_watch') {
      imageFile = 'calcu_watch.png'
    }
    
    return {
      file: imageFile,
      name: watch.name,
      rarity: watch.rarity,
      effect_description: watch.effect_description,
      description: watch.description
    }
  })
}

// Map enemy data
export const getEnemyData = () => {
  return enemyData.map((enemy: any) => {
    const stats = `HP ${enemy.stats.hp} | STR ${enemy.stats.strength} | RES ${enemy.stats.resilience} | INS ${enemy.stats.insight}`
    
    // Safely handle traits
    const immunities = Array.isArray(enemy.traits?.immunities) ? enemy.traits.immunities : []
    const weaknesses = Array.isArray(enemy.traits?.weaknesses) ? enemy.traits.weaknesses : []
    
    const traits = [
      ...(immunities.length > 0 ? [`Immune: ${immunities.join(', ')}`] : []),
      ...(weaknesses.length > 0 ? [`Weak: ${weaknesses.join(', ')}`] : [])
    ].join(' • ')
    
    // Handle the special case of D1_grunt which has an underscore prefix in the filename
    let portraitFile = enemy.portrait
    if (enemy.id === 'D1_grunt') {
      portraitFile = '_D1_grunt.png'
    }
    
    return {
      file: portraitFile,
      name: enemy.name,
      stats: stats,
      traits: traits || 'No special traits',
      description: enemy.description
    }
  })
} 
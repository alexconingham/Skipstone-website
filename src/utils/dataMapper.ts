// Utility to map JSON data to website format
import diceData from '../../data/dice_data.json'
import mementoData from '../../data/memento_data.json'
import enemyData from '../../data/enemy_data.json'
import watchData from '../../data/watch_data.json'

// Map dice data
export const getDiceData = () => {
  const mappedDice = diceData.dice.map((die: any) => {
    // Handle special cases for dice filename mapping
    let filename = `${die.id}.png`
    
    // Map JSON IDs to actual image filenames
    const filenameMap: { [key: string]: string } = {
      'life': 'life.png',
      'life_die': 'life.png',
      'simple_heal': 'simple_d6_heal.png',
      'simple_d6_heal': 'simple_d6_heal.png',
      'simple_d12_heal': 'simple_d12_heal.png',
      'advanced_renew': 'advanced_renew_die.png',
      'gladiator': 'gladiator_die.png',
      'brave_heart': 'brave_heart_die.png',
      'divinity': 'divinity_die.png',
      'stagger': 'stagger_die.png',
      'reflect': 'reflect_die.png',
      'knockback': 'knockback_die.png',
      'piercing': 'piercing_die.png',
      'cleanse': 'cleanse_die.png',
      'death': 'death_die.png',
      'burn': 'burn_die.png',
      'heal': 'heal_die.png',
      'renew': 'renew_die.png',
      'bleed': 'bleed_die.png',
      'shield': 'shield_die.png',
      'poison': 'poison_die.png',
      'iron': 'iron_die.png',
      'razor': 'razor_die.png',
      'pain': 'pain_die.png',
      'thorn': 'thorn_die.png',
      'chrono': 'chrono_die.png'
    }
    
    // Use mapped filename if available, otherwise use default
    if (filenameMap[die.id]) {
      filename = filenameMap[die.id]
    }
    
    return {
      file: filename,
      name: die.display_name || die.name,
      rarity: die.rarity,
      description: die.effect_description
    }
  })

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
document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcome-screen")
  const loginCard = document.getElementById("login-card")
  const signupCard = document.getElementById("signup-card")
  const showSignupLink = document.getElementById("show-signup")
  const showLoginLink = document.getElementById("show-login")
  const loginButton = document.getElementById("login-button")
  const signupButton = document.getElementById("signup-button")
  const mindMap = document.getElementById("mind-map")
  const logoutButton = document.getElementById("logout-button")
  const addNoteButton = document.getElementById("add-note")
  const inspireButton = document.getElementById("inspire-me")
  const canvas = document.getElementById("canvas")
  const emojiPicker = document.getElementById("emoji-picker")
  const welcomeTooltip = document.getElementById("welcome-tooltip")
  const closeWelcomeButton = document.getElementById("close-welcome")
  const noteTypeSelector = document.getElementById("note-type-selector")
  const myNotesBtn = document.getElementById("my-notes-btn")
  const myNotesPanel = document.getElementById("my-notes-panel")
  const closeMyNotesBtn = document.getElementById("close-my-notes")
  const workspacesBtn = document.getElementById("workspaces-btn")
  const workspacesPanel = document.getElementById("workspaces-panel")
  const closeWorkspacesBtn = document.getElementById("close-workspaces")
  const newWorkspaceBtn = document.getElementById("new-workspace-btn")
  const newWorkspaceModal = document.getElementById("new-workspace-modal")
  const cancelWorkspaceBtn = document.getElementById("cancel-workspace")
  const createWorkspaceBtn = document.getElementById("create-workspace")
  const inspirationPopup = document.getElementById("inspiration-popup")
  const closeInspirationBtn = document.getElementById("close-inspiration")
  const inspirationText = document.getElementById("inspiration-text")
  const workspaceContainer = document.getElementById("workspace-container")
  const defaultWorkspace = document.getElementById("default-workspace")

  // State
  let currentEmojiButton = null
  let currentNoteTypeButton = null
  let connections = []
  let noteCounter = 1
  let activeNote = null
  const isFirstVisit = !localStorage.getItem("hasVisitedBefore")
  const workspaces = [{ id: "default-workspace", name: "Default Workspace", notes: 1 }]
  let currentWorkspaceId = "default-workspace"

  // Inspirational quotes
  const inspirationalQuotes = [
    "Believe you can and you're halfway there! ✨",
    "Dream big, work hard, stay focused! 🚀",
    "Every day is a new beginning! 🌅",
    "Your only limit is your mind! 🧠",
    "Make today amazing! 🌈",
    "Small steps lead to big changes! 👣",
    "Stay positive, work hard, make it happen! ⭐",
    "Focus on the good! 🌻",
    "You are capable of amazing things! 💫",
    "Keep going, you're doing great! 🎯",
  ]

  const noteColors = ["bg-pastel-pink", "bg-pastel-blue", "bg-pastel-mint", "bg-pastel-lavender", "bg-pastel-yellow"]

  // Notes type
  const noteTypes = [
    { name: "idea", emoji: "💡", description: "For new ideas and concepts" },
    { name: "task", emoji: "✅", description: "For action items and to-dos" },
    { name: "question", emoji: "❓", description: "For questions and uncertainties" },
    { name: "note", emoji: "📝", description: "For general notes and information" },
    { name: "important", emoji: "⭐", description: "For high priority items" },
  ]

  if (isFirstVisit) {
    localStorage.setItem("hasVisitedBefore", "true")
  } else {
    welcomeTooltip.classList.add("hidden")
  }

  closeWelcomeButton.addEventListener("click", () => {
    welcomeTooltip.classList.add("hidden")
  })

  // login and signup toggle
  showSignupLink.addEventListener("click", (e) => {
    e.preventDefault()
    loginCard.classList.add("hidden")
    signupCard.classList.remove("hidden")
  })

  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault()
    signupCard.classList.add("hidden")
    loginCard.classList.remove("hidden")
  })

  // Login
  loginButton.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden")
    mindMap.classList.remove("hidden")
  })

  // Signup 
  signupButton.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden")
    mindMap.classList.remove("hidden")
  })

  // Logout 
  logoutButton.addEventListener("click", () => {
    mindMap.classList.add("hidden")
    welcomeScreen.classList.remove("hidden")
    loginCard.classList.remove("hidden")
    signupCard.classList.add("hidden")
  })

  // My Notes toggle
  myNotesBtn.addEventListener("click", () => {
    myNotesPanel.classList.toggle("open")
    workspacesPanel.classList.remove("open")
  })

  closeMyNotesBtn.addEventListener("click", () => {
    myNotesPanel.classList.remove("open")
  })

  // Workspaces toggle
  workspacesBtn.addEventListener("click", () => {
    workspacesPanel.classList.toggle("open")
    myNotesPanel.classList.remove("open")
  })

  closeWorkspacesBtn.addEventListener("click", () => {
    workspacesPanel.classList.remove("open")
  })

  // New workspace
  newWorkspaceBtn.addEventListener("click", () => {
    newWorkspaceModal.classList.remove("hidden")
  })

  cancelWorkspaceBtn.addEventListener("click", () => {
    newWorkspaceModal.classList.add("hidden")
  })
  createWorkspaceBtn.addEventListener("click", () => {
    const name = document.getElementById("workspace-name").value
    const description = document.getElementById("workspace-description").value

    if (name.trim() !== "") {
      createNewWorkspace(name, description)
      newWorkspaceModal.classList.add("hidden")
      document.getElementById("workspace-name").value = ""
      document.getElementById("workspace-description").value = ""
    }
  })
  newWorkspaceModal.addEventListener("click", (e) => {
    if (e.target === newWorkspaceModal) {
      newWorkspaceModal.classList.add("hidden")
    }
  })

  // Inspiration popups
  inspireButton.addEventListener("click", () => {
    const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]
    inspirationText.textContent = randomQuote
    inspirationPopup.classList.remove("hidden")
  })

  closeInspirationBtn.addEventListener("click", () => {
    inspirationPopup.classList.add("hidden")
  })

  // Workspace navigation
  function switchToWorkspace(workspaceId) {
    // Hide all workspaces
    document.querySelectorAll(".workspace-content").forEach((ws) => {
      ws.classList.remove("active")
      ws.style.display = "none"
    })
    const workspace = document.getElementById(workspaceId)
    if (workspace) {
      workspace.classList.add("active")
      workspace.style.display = "block"
      currentWorkspaceId = workspaceId
    }
    workspacesPanel.classList.remove("open")
  }

  // Create a new workspace
  function createNewWorkspace(name, description = "") {
    const workspaceId = "workspace-" + Date.now()
    const workspaceElement = document.createElement("div")
    workspaceElement.id = workspaceId
    workspaceElement.className = "workspace-content min-h-screen relative"
    workspaceElement.style.display = "none"
    const canvasElement = document.createElement("div")
    canvasElement.className = "min-h-screen w-full relative"
    canvasElement.id = `canvas-${workspaceId}`
    const centralNoteElement = document.createElement("div")
    centralNoteElement.className =
      "note absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 p-4 rounded-2xl bg-pastel-yellow shadow-md hover:shadow-lg transition-all"
    centralNoteElement.dataset.id = `start-${workspaceId}`
    centralNoteElement.dataset.central = "true"
    centralNoteElement.style.zIndex = "10"
    centralNoteElement.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <div class="tooltip">
          <button class="note-type-btn text-sm bg-white/50 px-2 py-1 rounded-full text-yellow-700">
            <span>idea</span>
            <span>💡</span>
          </button>
          <span class="tooltip-text">Click to change note type</span>
        </div>
        <div class="flex space-x-1">
          <div class="tooltip">
            <button class="emoji-btn text-xs bg-white/70 w-6 h-6 rounded-full hover:bg-white">😊</button>
            <span class="tooltip-text">Change emoji</span>
          </div>
          <div class="tooltip">
            <button class="delete-btn text-xs bg-white/70 w-6 h-6 rounded-full hover:bg-pink-200">❌</button>
            <span class="tooltip-text">Delete note</span>
          </div>
        </div>
      </div>
      <div class="note-content" contenteditable="true">${name}</div>
    `

    canvasElement.appendChild(centralNoteElement)
    workspaceElement.appendChild(canvasElement)
    workspaceContainer.appendChild(workspaceElement)
    makeNoteDraggable(centralNoteElement)

    // Add to workspaces array
    workspaces.push({
      id: workspaceId,
      name: name,
      description: description,
      notes: 1,
    })

    // Add to workspaces list 
    const workspacesList = document.getElementById("workspaces-list")
    const newWorkspaceItem = document.createElement("div")
    newWorkspaceItem.className =
      "bg-white p-3 rounded-lg mb-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    newWorkspaceItem.dataset.id = workspaceId
    newWorkspaceItem.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-purple-500 mr-2">📝</span>
          <span class="font-medium">${name}</span>
        </div>
        <span class="text-xs text-gray-500">1 note</span>
      </div>
      <p class="text-xs text-gray-600 mt-1">Last edited: Just now</p>
    `

    workspacesList.prepend(newWorkspaceItem)
    switchToWorkspace(workspaceId)

    return workspaceId
  }

  // Update workspace item click handlers
  document.addEventListener("click", (e) => {
    const workspaceItem = e.target.closest("#workspaces-list > div")
    if (workspaceItem) {
      const workspaceId = workspaceItem.dataset.id
      switchToWorkspace(workspaceId)
    }
  })

  // Find a position for a new note
  function findFlowerPosition(targetCanvas = canvas, noteIndex = 1) {
    const canvasRect = targetCanvas.getBoundingClientRect()
    const centerX = canvasRect.width / 2
    const centerY = canvasRect.height / 2
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

    // Get the central note
    const centralNote =
      targetCanvas.querySelector('.note[data-central="true"]') || targetCanvas.querySelector('.note[data-id="start"]')

    if (!centralNote) {
      return {
        top: centerY + scrollTop,
        left: centerX + scrollLeft,
      }
    }

    // Get central note position
    const centralRect = centralNote.getBoundingClientRect()
    const centralX = centralRect.left + centralRect.width / 2 + scrollLeft
    const centralY = centralRect.top + centralRect.height / 2 + scrollTop
    // Pattern
    const numPetals = 8 
    const ringSpacing = 200 
    const maxRings = 5 
    let totalNotesInPreviousRings = 0
    let currentRing = 0
    let notesInCurrentRing = 0

    for (let ring = 1; ring <= maxRings; ring++) {
      notesInCurrentRing = numPetals * ring
      if (noteIndex <= totalNotesInPreviousRings + notesInCurrentRing) {
        currentRing = ring
        break
      }
      totalNotesInPreviousRings += notesInCurrentRing
    }
    const positionInRing = noteIndex - totalNotesInPreviousRings - 1
    const angleStep = (2 * Math.PI) / notesInCurrentRing
    const angle = positionInRing * angleStep - Math.PI / 2
    const randomAngleOffset = (Math.random() * 0.2 - 0.1) * angleStep
    const finalAngle = angle + randomAngleOffset
    const baseRadius = currentRing * ringSpacing
    const randomRadiusOffset = (Math.random() * 0.2 - 0.1) * ringSpacing
    const radius = baseRadius + randomRadiusOffset
    const x = centralX + radius * Math.cos(finalAngle)
    const y = centralY + radius * Math.sin(finalAngle)

    return { top: y, left: x }
  }

  // Connection between a note and the central note
  function createCentralConnection(noteId, targetCanvas = canvas) {
    // Find the central note
    const centralNote =
      targetCanvas.querySelector('.note[data-central="true"]') || targetCanvas.querySelector('.note[data-id="start"]')

    if (!centralNote) return

    const centralId = centralNote.dataset.id
    const connectionExists = connections.some(
      (conn) => (conn.from === centralId && conn.to === noteId) || (conn.from === noteId && conn.to === centralId),
    )

    if (!connectionExists) {
      connections.push({ from: centralId, to: noteId })
      updateConnections(targetCanvas)
    }
  }
  function updateConnections(targetCanvas = canvas) {
    targetCanvas.querySelectorAll(".connector").forEach((conn) => conn.remove())
    connections.forEach((conn) => {
      const fromElement = document.querySelector(`.note[data-id="${conn.from}"]`)
      const toElement = document.querySelector(`.note[data-id="${conn.to}"]`)

      if (fromElement && toElement) {
        const fromRect = fromElement.getBoundingClientRect()
        const toRect = toElement.getBoundingClientRect()

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        const fromX = fromRect.left + fromRect.width / 2 + scrollLeft
        const fromY = fromRect.top + fromRect.height / 2 + scrollTop
        const toX = toRect.left + toRect.width / 2 + scrollLeft
        const toY = toRect.top + toRect.height / 2 + scrollTop

        // Create SVG line
        const line = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        line.classList.add("connector")
        line.setAttribute("width", "100%")
        line.setAttribute("height", "100%")
        line.style.position = "absolute"
        line.style.top = "0"
        line.style.left = "0"
        line.style.pointerEvents = "none"
        line.style.zIndex = "0"
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        const dx = toX - fromX
        const dy = toY - fromY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const midX = (fromX + toX) / 2
        const midY = (fromY + toY) / 2
        const curveStrength = Math.min(distance * 0.2, 50)
        const angle = Math.atan2(dy, dx) - Math.PI / 2
        const controlX = midX + curveStrength * Math.cos(angle)
        const controlY = midY + curveStrength * Math.sin(angle)
        const d = `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`
        path.setAttribute("d", d)
        path.setAttribute("fill", "none")
        path.setAttribute("stroke", "#c4b5fd")
        path.setAttribute("stroke-width", "2")
        path.setAttribute("stroke-dasharray", "5,5")
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
        gradient.id = `gradient-${conn.from}-${conn.to}`
        gradient.setAttribute("gradientUnits", "userSpaceOnUse")
        gradient.setAttribute("x1", fromX)
        gradient.setAttribute("y1", fromY)
        gradient.setAttribute("x2", toX)
        gradient.setAttribute("y2", toY)
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop1.setAttribute("offset", "0%")
        stop1.setAttribute("stop-color", "#c4b5fd")
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop2.setAttribute("offset", "100%")
        stop2.setAttribute("stop-color", "#a78bfa")

        gradient.appendChild(stop1)
        gradient.appendChild(stop2)

        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
        defs.appendChild(gradient)

        line.appendChild(defs)

        path.setAttribute("stroke", `url(#gradient-${conn.from}-${conn.to})`)

        line.appendChild(path)
        targetCanvas.appendChild(line)
      }
    })
  }

  // Handle note type selection
  document.addEventListener("click", (e) => {
    if (e.target.closest(".note-type-btn")) {
      currentNoteTypeButton = e.target.closest(".note-type-btn")
      const rect = currentNoteTypeButton.getBoundingClientRect()
      noteTypeSelector.style.top = rect.bottom + 5 + "px"
      noteTypeSelector.style.left = rect.left + "px"
      noteTypeSelector.classList.remove("hidden")
      e.stopPropagation()
    }
    else if (e.target.closest(".note-type-option")) {
      const option = e.target.closest(".note-type-option")
      if (currentNoteTypeButton) {
        const type = option.dataset.type
        const emoji = option.dataset.emoji
        currentNoteTypeButton.innerHTML = `<span>${type}</span><span>${emoji}</span>`
        noteTypeSelector.classList.add("hidden")
      }
    }
    else if (e.target.classList.contains("emoji-btn")) {
      currentEmojiButton = e.target
      const rect = e.target.getBoundingClientRect()
      emojiPicker.style.top = rect.bottom + 5 + "px"
      emojiPicker.style.left = rect.left - 100 + "px"
      emojiPicker.classList.remove("hidden")
      e.stopPropagation()
    }
    else if (e.target.classList.contains("emoji-option")) {
      if (currentEmojiButton) {
        currentEmojiButton.textContent = e.target.textContent
        emojiPicker.classList.add("hidden")
      }
    }
    else if (e.target.classList.contains("delete-btn")) {
      const noteElement = e.target.closest(".note")
      if (noteElement) {
        if (noteElement.dataset.central === "true" || noteElement.dataset.id === "start") {
          alert("Cannot delete the central note!")
          return
        }

        const noteId = noteElement.dataset.id
        connections = connections.filter((conn) => conn.from !== noteId && conn.to !== noteId)
        updateConnections()

        noteElement.classList.add("opacity-0", "scale-95")
        setTimeout(() => {
          noteElement.remove()
          updateWorkspaceNoteCount(currentWorkspaceId, -1)
          rearrangeNotesInFlowerPattern()
        }, 300)
      }
    }
    else {
      if (!e.target.closest("#emoji-picker") && !e.target.classList.contains("emoji-btn")) {
        emojiPicker.classList.add("hidden")
      }

      if (!e.target.closest("#note-type-selector") && !e.target.closest(".note-type-btn")) {
        noteTypeSelector.classList.add("hidden")
      }
    }
  })

  function rearrangeNotesInFlowerPattern() {
    const currentWorkspace = document.querySelector(".workspace-content.active")
    const currentCanvas = currentWorkspace
      ? currentWorkspace.querySelector("div[class*='min-h-screen w-full relative']")
      : canvas

    const notes = Array.from(currentCanvas.querySelectorAll(".note")).filter(
      (note) => note.dataset.central !== "true" && note.dataset.id !== "start",
    )

    // Rearrange each note
    notes.forEach((note, index) => {
      const position = findFlowerPosition(currentCanvas, index + 1)
      note.style.transition = "all 0.5s ease-in-out"
      note.style.top = `${position.top}px`
      note.style.left = `${position.left}px`
    })

    setTimeout(() => {
      updateConnections(currentCanvas)
    }, 600)
  }

  document.addEventListener("focusin", (e) => {
    if (e.target.classList.contains("note-content")) {
      const noteElement = e.target.closest(".note")
      if (noteElement) {
        noteElement.setAttribute("data-editing", "true")
      }
    }
  })

  document.addEventListener("focusout", (e) => {
    if (e.target.classList.contains("note-content")) {
      const noteElement = e.target.closest(".note")
      if (noteElement) {
        noteElement.removeAttribute("data-editing")
        const content = e.target.textContent.trim()
        if (content) {
          const typeBtn = noteElement.querySelector(".note-type-btn")
          const typeText = typeBtn.querySelector("span:first-child").textContent
          const typeEmoji = typeBtn.querySelector("span:last-child").textContent
          const myNotesList = document.getElementById("my-notes-list")
          const existingNotes = myNotesList.querySelectorAll("p")
          let exists = false

          existingNotes.forEach((note) => {
            if (note.textContent === content) {
              exists = true
            }
          })

          if (!exists && content !== "Start here! Click to edit") {
            const noteColor = noteElement.classList.contains("bg-pastel-pink")
              ? "bg-pastel-pink"
              : noteElement.classList.contains("bg-pastel-blue")
                ? "bg-pastel-blue"
                : noteElement.classList.contains("bg-pastel-mint")
                  ? "bg-pastel-mint"
                  : noteElement.classList.contains("bg-pastel-lavender")
                    ? "bg-pastel-lavender"
                    : "bg-pastel-yellow"

            const newNote = document.createElement("div")
            newNote.className = `${noteColor} p-3 rounded-lg mb-3`
            newNote.innerHTML = `
              <div class="flex items-center text-sm font-medium mb-1">
                <span class="mr-1">${typeText}</span>
                <span>${typeEmoji}</span>
              </div>
              <p class="text-sm">${content}</p>
            `

            myNotesList.prepend(newNote)
          }
        }
      }
    }
  })

  window.addEventListener("resize", () => {
    updateConnections()

    // Rearrange notes 
    setTimeout(() => {
      rearrangeNotesInFlowerPattern()
    }, 100)
  })

  // Make notes draggable 
  function makeNoteDraggable(element) {
    let startX, startY
    let initialX, initialY
    let isDragging = false
    let rafId = null

    element.addEventListener("mousedown", dragStart)
    element.addEventListener("touchstart", dragStart, { passive: false })

    function dragStart(e) {
      if (
        e.target.closest(".emoji-btn") ||
        e.target.closest(".delete-btn") ||
        e.target.closest(".note-content") ||
        e.target.closest(".note-type-btn")
      ) {
        return
      }

      e.preventDefault()
      activeNote = element
      const rect = element.getBoundingClientRect()
      initialX = rect.left
      initialY = rect.top
      if (e.type === "touchstart") {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
      } else {
        startX = e.clientX
        startY = e.clientY
      }
      element.classList.add("dragging")
      isDragging = true

      // Event listeners for drag and end
      if (e.type === "touchstart") {
        document.addEventListener("touchmove", drag, { passive: false })
        document.addEventListener("touchend", dragEnd)
      } else {
        document.addEventListener("mousemove", drag)
        document.addEventListener("mouseup", dragEnd)
      }
    }

    function drag(e) {
      if (!isDragging) return
      e.preventDefault()
      let currentX, currentY
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX
        currentY = e.touches[0].clientY
      } else {
        currentX = e.clientX
        currentY = e.clientY
      }

      const deltaX = currentX - startX
      const deltaY = currentY - startY
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        element.style.left = initialX + deltaX + "px"
        element.style.top = initialY + deltaY + "px"
        updateConnections()

        rafId = null
      })
    }

    function dragEnd() {
      if (!isDragging) return
      document.removeEventListener("mousemove", drag)
      document.removeEventListener("mouseup", dragEnd)
      document.removeEventListener("touchmove", drag)
      document.removeEventListener("touchend", dragEnd)

      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      if (element.dataset.central === "true" || element.dataset.id === "start") {
        rearrangeNotesInFlowerPattern()
      }
      updateConnections()
      element.classList.remove("dragging")
      isDragging = false
      activeNote = null
    }
  }
  // Note elements
  function createNoteElement(noteId, position, noteType, color, content = "") {
    const noteElement = document.createElement("div")
    noteElement.className = `note ${color} p-4 rounded-2xl shadow-md hover:shadow-lg transition-all`
    noteElement.dataset.id = noteId
    noteElement.style.top = `${position.top}px`
    noteElement.style.left = `${position.left}px`
    noteElement.style.zIndex = "1"

    noteElement.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <div class="tooltip">
          <button class="note-type-btn text-sm bg-white/50 px-2 py-1 rounded-full text-gray-700">
            <span>${noteType.name}</span>
            <span>${noteType.emoji}</span>
          </button>
          <span class="tooltip-text">Click to change note type</span>
        </div>
        <div class="flex space-x-1">
          <div class="tooltip">
            <button class="emoji-btn text-xs bg-white/70 w-6 h-6 rounded-full hover:bg-white">😊</button>
            <span class="tooltip-text">Change emoji</span>
          </div>
          <div class="tooltip">
            <button class="delete-btn text-xs bg-white/70 w-6 h-6 rounded-full hover:bg-pink-200">❌</button>
            <span class="tooltip-text">Delete note</span>
          </div>
        </div>
      </div>
      <div class="note-content" contenteditable="true">${content}</div>
    `

    return noteElement
  }

  // Add new note
  addNoteButton.addEventListener("click", () => {
    const noteId = "note-" + noteCounter++
    const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)]
    const randomType = noteTypes[Math.floor(Math.random() * noteTypes.length)]

    // Find current workspace's canvas
    const currentWorkspace = document.querySelector(".workspace-content.active")
    const currentCanvas = currentWorkspace
      ? currentWorkspace.querySelector("div[class*='min-h-screen w-full relative']")
      : canvas
    const existingNotes = currentCanvas.querySelectorAll(".note:not([data-central='true']):not([data-id='start'])")
    const noteCount = existingNotes.length + 1
    const position = findFlowerPosition(currentCanvas, noteCount)

    const noteElement = createNoteElement(noteId, position, randomType, randomColor)
    currentCanvas.appendChild(noteElement)
    makeNoteDraggable(noteElement)
    const noteContent = noteElement.querySelector(".note-content")
    noteContent.focus()
    createCentralConnection(noteId, currentCanvas)
    updateWorkspaceNoteCount(currentWorkspaceId, 1)
  })
  function updateWorkspaceNoteCount(workspaceId, change) {
    const workspace = workspaces.find((ws) => ws.id === workspaceId)
    if (workspace) {
      workspace.notes += change

      // Update 
      const workspaceItem = document.querySelector(`#workspaces-list > div[data-id="${workspaceId}"]`)
      if (workspaceItem) {
        const countElement = workspaceItem.querySelector(".text-xs.text-gray-500")
        if (countElement) {
          countElement.textContent = `${workspace.notes} notes`
        }
      }
    }
  }

  // Initialize the mind map
  function initializeMindMap() {
    const startNote = document.querySelector('.note[data-id="start"]')
    if (startNote) {
      startNote.dataset.central = "true"
      startNote.style.zIndex = "10"
      makeNoteDraggable(startNote)
    }
  }

  initializeMindMap()
})

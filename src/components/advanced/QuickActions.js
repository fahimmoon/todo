import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './QuickActions.css';

const QuickActions = () => {
  const { 
    quickActions, 
    addQuickAction, 
    toggleFavoriteAction, 
    removeAction,
    openModal,
    setActiveModal
  } = useDashboard();

  const [recentlyUsed, setRecentlyUsed] = useState(new Set());

  // Execute action and track usage
  const executeAction = (action) => {
    setRecentlyUsed(prev => new Set([...prev, action.id]));
    
    // Handle different action types
    switch (action.type) {
      case 'modal':
        if (action.modalType) {
          setActiveModal(action.modalType);
          openModal();
        }
        break;
      case 'external':
        if (action.url) {
          window.open(action.url, '_blank');
        }
        break;
      case 'navigation':
        console.log(`Navigate to: ${action.route}`);
        break;
      default:
        console.log(`Execute action: ${action.title}`);
    }
  };

  // Get action icon based on type
  const getActionIcon = (action) => {
    const iconMap = {
      'add-task': '✓',
      'schedule-meeting': '📅',
      'upload-document': '📄',
      'send-message': '💬',
      'create-reminder': '🔔',
      'generate-report': '📊',
      'backup-data': '💾',
      'view-analytics': '📈',
      'settings': '⚙️',
      'help': '❓'
    };
    
    return iconMap[action.type] || action.icon || '⚡';
  };

  // Get action color theme
  const getActionTheme = (action) => {
    const themeMap = {
      'add-task': 'blue',
      'schedule-meeting': 'green',
      'upload-document': 'purple',
      'send-message': 'orange',
      'create-reminder': 'red',
      'generate-report': 'indigo',
      'backup-data': 'gray',
      'view-analytics': 'pink',
      'settings': 'slate',
      'help': 'cyan'
    };
    
    return themeMap[action.type] || action.theme || 'blue';
  };

  // Filter actions by category
  const favoriteActions = quickActions.filter(action => action.favorite);
  const recentActions = quickActions.filter(action => 
    recentlyUsed.has(action.id) && !action.favorite
  );
  const otherActions = quickActions.filter(action => 
    !action.favorite && !recentlyUsed.has(action.id)
  );

  const openCustomActionModal = () => {
    setActiveModal('custom-action');
    openModal();
  };

  return (
    <div className="quick-actions-container">
      {/* Header */}
      <div className="quick-actions-header">
        <div className="header-left">
          <h3 className="quick-actions-title">Quick Actions</h3>
          <span className="actions-count">{quickActions.length}</span>
        </div>
        <button 
          className="add-action-button"
          onClick={openCustomActionModal}
          title="Add Custom Action"
        >
          <span className="add-icon">+</span>
        </button>
      </div>

      {/* Content */}
      <div className="quick-actions-content">
        {quickActions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚡</div>
            <h4 className="empty-message">No Quick Actions</h4>
            <p className="empty-description">
              Add custom actions to streamline your workflow
            </p>
            <button 
              className="create-first-action"
              onClick={openCustomActionModal}
            >
              Create Your First Action
            </button>
          </div>
        ) : (
          <div className="actions-sections">
            {/* Favorite Actions */}
            {favoriteActions.length > 0 && (
              <div className="actions-section">
                <div className="section-header">
                  <span className="section-icon">⭐</span>
                  <span className="section-title">Favorites</span>
                  <span className="section-count">{favoriteActions.length}</span>
                </div>
                <div className="actions-grid">
                  {favoriteActions.map(action => (
                    <ActionCard 
                      key={action.id}
                      action={action}
                      theme={getActionTheme(action)}
                      icon={getActionIcon(action)}
                      onExecute={() => executeAction(action)}
                      onToggleFavorite={() => toggleFavoriteAction(action.id)}
                      onRemove={() => removeAction(action.id)}
                      isRecent={recentlyUsed.has(action.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Actions */}
            {recentActions.length > 0 && (
              <div className="actions-section">
                <div className="section-header">
                  <span className="section-icon">🕒</span>
                  <span className="section-title">Recently Used</span>
                  <span className="section-count">{recentActions.length}</span>
                </div>
                <div className="actions-grid">
                  {recentActions.map(action => (
                    <ActionCard 
                      key={action.id}
                      action={action}
                      theme={getActionTheme(action)}
                      icon={getActionIcon(action)}
                      onExecute={() => executeAction(action)}
                      onToggleFavorite={() => toggleFavoriteAction(action.id)}
                      onRemove={() => removeAction(action.id)}
                      isRecent={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Actions */}
            {otherActions.length > 0 && (
              <div className="actions-section">
                <div className="section-header">
                  <span className="section-icon">📋</span>
                  <span className="section-title">All Actions</span>
                  <span className="section-count">{otherActions.length}</span>
                </div>
                <div className="actions-grid">
                  {otherActions.map(action => (
                    <ActionCard 
                      key={action.id}
                      action={action}
                      theme={getActionTheme(action)}
                      icon={getActionIcon(action)}
                      onExecute={() => executeAction(action)}
                      onToggleFavorite={() => toggleFavoriteAction(action.id)}
                      onRemove={() => removeAction(action.id)}
                      isRecent={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ 
  action, 
  theme, 
  icon, 
  onExecute, 
  onToggleFavorite, 
  onRemove, 
  isRecent 
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleExecute = () => {
    onExecute();
    setShowMenu(false);
  };

  return (
    <div className={`action-card theme-${theme} ${isRecent ? 'recent' : ''}`}>
      <button 
        className="action-button"
        onClick={handleExecute}
        title={action.description}
      >
        <div className="action-icon">
          {icon}
        </div>
        <div className="action-content">
          <span className="action-title">{action.title}</span>
          {action.description && (
            <span className="action-description">{action.description}</span>
          )}
        </div>
      </button>

      {/* Action Menu */}
      <div className="action-menu">
        <button 
          className="menu-trigger"
          onClick={() => setShowMenu(!showMenu)}
          title="Action Options"
        >
          <span className="menu-dots">⋯</span>
        </button>
        {showMenu && (
          <div className="menu-dropdown">
            <button 
              className="menu-item"
              onClick={() => {
                onToggleFavorite();
                setShowMenu(false);
              }}
            >
              <span className="menu-icon">
                {action.favorite ? '★' : '☆'}
              </span>
              {action.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button 
              className="menu-item execute"
              onClick={handleExecute}
            >
              <span className="menu-icon">▶</span>
              Execute Action
            </button>
            <button 
              className="menu-item delete"
              onClick={() => {
                onRemove();
                setShowMenu(false);
              }}
            >
              <span className="menu-icon">🗑</span>
              Remove Action
            </button>
          </div>
        )}
      </div>

      {/* Status Indicators */}
      <div className="action-indicators">
        {action.favorite && (
          <span className="indicator favorite" title="Favorite">⭐</span>
        )}
        {isRecent && (
          <span className="indicator recent" title="Recently Used">🕒</span>
        )}
        {action.shortcut && (
          <span className="indicator shortcut" title={`Shortcut: ${action.shortcut}`}>
            ⌨
          </span>
        )}
      </div>
    </div>
  );
};

export default QuickActions;

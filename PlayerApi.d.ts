/**
 * Возможные остояния плеера.
 */
export declare enum PlayerState {
    INACTIVE = -1,
    STOPPED = 0,
    PLAYING = 1,
    BUFFERING = 2,
    PAUSED = 3,
}
/**
 * Конфиг плейлиста, может быть строкой (ссылка на плейлист) или объектом.
 */
export interface SourceConfig {
    /**
     * Плейлист.
     */
    stream: string;
    /**
     * Начать проигрывание с заданной секунды.
     */
    startFrom?: number;
    /**
     * Ссылка на постер (картинка-превью).
     */
    preview?: string;
}
/**
 * Обработчики событий плеера.
 */
export interface PublicHandlers {
    /**
     * Вызывается, когда длительность загруженного плейлиста изменилась
     * @param duration
     */
    onDurationChanged: (duration: number) => void;
    /**
     * Вызывается, когда текущее время проигрывания изменилось.
     * @param currentTime
     */
    onCurrentTimeChanged: (currentTime: number) => void;
    /**
     * Вызывается, когда состояние плеера изменилось.
     * @param state
     */
    onStateChanged: (state: PlayerState) => void;
    /**
     * Вызывается, когда произошла ошибка.
     * @param error
     */
    onError: (error: any) => void;
}
/**
 * Параметры конфигурации плеера.
 */
export interface PlayerParams {
    /**
     * Конфигурация плейлиста или ссылка на плейлист, который будет загружен в созданном плеере.
     */
    source: SourceConfig | string;
    /**
     * Элемент/#id, в котором будет создан плеер.
     */
    element: string | Element;
    /**
     * Будет ли проигрывание начинаться автоматически после инициализации плеера.
     */
    autoplay?: boolean;
    /**
     * Объект с обработчиками событий плеера.
     */
    handlers?: Partial<PublicHandlers>;
}
export declare abstract class PlayerApi {
    /**
     * Создает плеер с переданными параметрами.
     * @param params - Параметры нового плеера.
     * @returns Объект плеера.
     */
    constructor(params: PlayerParams);
    /**
     * @returns Текущее состояние плеера.
     */
    abstract getState(): PlayerState;
    /**
     * @returns Текущее время воспроизведения в секундах (может быть не актуально для LIVE плейлистов).
     */
    abstract getCurrentTime(): number;
    /**
     * @returns Текущая продолжительность видео (может быть не актуально для LIVE и EVENT плейлистов).
     */
    abstract getDuration(): number;
    /**
     * @returns Текущее значение громкости (от 0 до 100).
     */
    abstract getVolume(): number;
    /**
     * Задает значение громкости (от 0 до 100).
     * @param volume - Новое значение громкости.
     * @returns `Promise`, который будет исполнен после установки нового значения громкости.
     */
    abstract setVolume(volume: number): Promise<void>;
    /**
     * Уничножает экземпляр плеера и все созданые им DOM-элементы.
     * @returns `Promise`, который будет исполнен после уничтожения плеера.
     */
    abstract destroy(): Promise<void>;
    /**
     * Начать проигрывание.
     * @returns `Promise`, который будет исполнен после начала проигрывания.
     */
    abstract play(): Promise<void>;
    /**
     * Поставить плеер на паузу.
     * @returns `Promise`, который будет исполнен после постановки плеера на паузу.
     */
    abstract pause(): Promise<void>;
    /**
     * Сменить текущую конфигурацию плейлиста.
     * @param config - Строка с ссылкой на плейлист или объект с конфигурацией плейлиста.
     * @returns `Promise`, который будет исполнен после загрузки нового плейлиста.
     */
    abstract setSource(config: SourceConfig | string): Promise<void>;
}